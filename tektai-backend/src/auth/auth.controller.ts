import { AuthService } from "./services/auth.service";
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Logger,
  HttpException, HttpStatus, Res, Get, InternalServerErrorException, NotFoundException, Patch, Req, UnauthorizedException, Put, UploadedFile, UseInterceptors

} from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { UsersService } from "src/users/users.service";
import {UserDto} from "../users/user.dto";
import {ResetPasswordDto} from "../schemas/reset-password.dto";
import {GoogleAuthGuard} from "./guards/google-auth.guard";
import {GithubAuthGuard} from "./guards/github-auth.guard";

import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger();
    

  constructor(private authService: AuthService,private  userService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user,req.body.rememberMe);
  }


  @Post('signup')
  async signUp(@Body() signUpDto: UserDto): Promise<any> {
    const validRoles = ['challenger', 'company', 'admin'];
    if (!signUpDto.username || !signUpDto.email || !signUpDto.password || !validRoles.includes(signUpDto.role.toLowerCase())) {
      throw new HttpException(
          'Invalid data format!',
          HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const user = await this.authService.signup(signUpDto);
      return {
        statusCode : 201,
        message: 'User registered successfully!',
        user,
      };
    } catch (error) {
      this.logger.log(error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/forget-password')
  async forgetPassword(@Body('email') email: string) {
    await this.authService.forgetPassword(email);
    return { message: 'Password reset email sent successfully' };
  }
 
  
 @Patch('/change-password')
async changePassword(
  @Body('email') email: string,
  @Body('currentPassword') currentPassword: string,
  @Body('newPassword') newPassword: string
): Promise<void> {
  try {
    await this.authService.changePassword(email, currentPassword, newPassword);
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException('User not found');
    } else if (error instanceof UnauthorizedException) {
      throw new UnauthorizedException('Current password is incorrect');
    } else {
      throw new InternalServerErrorException('Failed to change password');
    }
  }
}

  @Get('github')
  @UseGuards(GithubAuthGuard)
  githubLogin() {

  }

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async githubCallback(@Req() req, @Res() res) {
    if (req.user?.didNotFinishSignup) {
      res.redirect(`http://localhost:5173/auth/success-redirect?email=${req.user.email}&username=${req.user.name}`);
      return;
    }

    const auth = await this.authService.login(req.user);
    res.cookie('token', auth.access_token, { httpOnly: false });
    res.redirect(`http://localhost:5173/auth/success-redirect/`);
    return;
    

  }

  @Get('google')
  @UseGuards(GoogleAuthGuard )
  async auth() {

  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req,@Res() res) {

   if (req.user?.didNotFinishSignup) {
     res.redirect(`http://localhost:5173/auth/success-redirect?email=${req.user.email}&username=${req.user.name}`);
     return;
   }

   const auth = await this.authService.login(req.user);
   res.cookie('token', auth.access_token, { httpOnly: false });
   res.redirect(`http://localhost:5173/auth/success-redirect/`);
   return;
  }


   @Post('/forgot-password')
  async forgotPassword(@Body('email') email: string): Promise<void> {
    try {
      this.logger.log(`Initiating password reset for email: ${email}`);
      await this.authService.forgextPassword(email);
      this.logger.log(`Password reset initiated successfully for email: ${email}`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(`User not found for email: ${email}`);
        // Gérer l'erreur si l'utilisateur n'est pas trouvé
        // Retourner un message d'erreur approprié ou une réponse HTTP appropriée
      } else {
        this.logger.error(`Error resetting password for email: ${email}, error: ${error.message}`);
        // Gérer les autres erreurs
        // Retourner un message d'erreur approprié ou une réponse HTTP appropriée
      }
    }
  }
  @Post('/reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
    await this.authService.resetPassword(dto);
  }
  
}



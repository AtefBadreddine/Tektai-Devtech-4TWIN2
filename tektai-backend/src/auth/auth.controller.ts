import { AuthService } from "./services/auth.service";
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Logger,
  HttpException, HttpStatus, Res, Get, InternalServerErrorException, NotFoundException, Patch, Req, UnauthorizedException

} from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { UsersService } from "src/users/users.service";
import {UserDto} from "../users/user.dto";
import {ResetPasswordDto} from "../schemas/reset-password.dto";
import { AuthGuard } from "@nestjs/passport";
import {GoogleAuthGuard} from "./guards/google-auth.guard";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import {GithubAuthGuard} from "./guards/github-auth.guard";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

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

  @Get('currentUser')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Request() req) {
    return req.user;
  }


  @Post('/forget-password')
  async forgetPassword(@Body('email') email: string) {
    await this.authService.forgetPassword(email);
    return { message: 'Password reset email sent successfully' };
  }
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(resetPasswordDto.token,resetPasswordDto.newPassword);
    return {message: 'Password reset successfully'};

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


}



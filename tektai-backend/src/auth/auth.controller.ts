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

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger();
  constructor(private authService: AuthService,private  userService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
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
/*@UseGuards(GithubAuthGuard) 
@Post('oauth/login')
  async validateOAuthLogin(@Body() profile: any) {
    try {
      const user = await this.authService.validateOAuthLogin(profile);
      return { user };
    } catch (error) {
      return { error: error.message };
    }
  }
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req) {
    return req.user;
  }*/
  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin(@Res() res) {
    // Initiates the GitHub OAuth flow
    res.redirect('/auth/github/callback');
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubCallback(@Req() req, @Res() res) {
    try {
      // The user is now authenticated and their details are in req.user
      // You can handle the user's data or redirection logic here
      // For example, redirect the user to a success page
      return await this.authService.login(req.user);
      // il faut ajouter le token pour permetre de logger 
      //au lieu de redieract ==> lzm  token 
     
    } catch (error) {
      console.error('Error during GitHub OAuth callback:', error);
      res.redirect('/'); // Redirect to login page on error
    }
    

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
}



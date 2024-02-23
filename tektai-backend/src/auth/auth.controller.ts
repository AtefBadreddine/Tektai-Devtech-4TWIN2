import { AuthService } from "./services/auth.service";
import { Controller, Request, Post, UseGuards, Body, Logger, Get, UnauthorizedException } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger();
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Post('signup')
  async signUp(@Body() signUpDto: any): Promise<any> {
    const { email , username , password} = signUpDto;
    return this.authService.signup(email, password , username);
  }
   @Post('forget-password')
  async forgetPassword(@Body() body: { email: string }) {
    await this.authService.forgetPassword(body.email);
    return { message: 'Password reset email sent successfully' };
  }
  
 
}

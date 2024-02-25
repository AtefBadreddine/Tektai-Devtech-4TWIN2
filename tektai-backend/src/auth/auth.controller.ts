import { AuthService } from "./services/auth.service";

import { Controller, Request, Post, UseGuards, Body, Logger, Get, UnauthorizedException,Delete, Param, NotFoundException, Query, Res, InternalServerErrorException, Patch } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { UsersService } from "src/users/users.service";
import { ResetPasswordDto } from "src/schemas/reset-password.dto";


@Controller('auth')
export class AuthController {
  private readonly logger = new Logger();

  constructor(private authService: AuthService,
              private usersService: UsersService
              ) {}



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

 @Post('/forget-password') // Point de terminaison de l'API pour la réinitialisation du mot de passe
  async forgetPassword(@Body('email') email: string) { // Récupérer l'e-mail depuis le corps de la requête
    await this.authService.forgetPassword(email); // Appel de la méthode forgetPassword du service d'authentification
    return { message: 'Password reset email sent successfully' }; // Réponse si l'e-mail est envoyé avec succès
  }
   @Post('reset-password')
async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
  await this.authService.resetPassword(resetPasswordDto.token, resetPasswordDto.newPassword);
  return { message: 'Password reset successfully' };
}

 
  
 


}

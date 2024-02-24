import { AuthService } from "./services/auth.service";
<<<<<<< HEAD
import { Controller, Request, Post, UseGuards, Body, Logger, Get, UnauthorizedException,Delete, Param, NotFoundException } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { UsersService } from "src/users/users.service";
=======
import { Controller, Request, Post, UseGuards, Body, Logger, Get, UnauthorizedException } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
>>>>>>> da6bbd93e8b938c1f3f6d101e0357d1c72940aa3

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger();
<<<<<<< HEAD
  constructor(private authService: AuthService,
              private usersService: UsersService) {}
=======
  constructor(private authService: AuthService) {}
>>>>>>> da6bbd93e8b938c1f3f6d101e0357d1c72940aa3

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
<<<<<<< HEAD
   @Post('/forget-password') // Point de terminaison de l'API pour la réinitialisation du mot de passe
  async forgetPassword(@Body('email') email: string) { // Récupérer l'e-mail depuis le corps de la requête
    await this.authService.forgetPassword(email); // Appel de la méthode forgetPassword du service d'authentification
    return { message: 'Password reset email sent successfully' }; // Réponse si l'e-mail est envoyé avec succès
  }
     @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    const deletedUser = await this.usersService.deleteUser(userId);
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
  }
 @Post('reset-password')
async resetPassword(@Body('token') token: string, @Body('newPassword') newPassword: string) {
  await this.authService.resetPassword(token, newPassword);
  // Redirigez l'utilisateur vers une page de confirmation de réinitialisation du mot de passe
  return { message: 'Password reset successfully' };
}
 
=======
   @Post('forget-password')
  async forgetPassword(@Body() body: { email: string }) {
    await this.authService.forgetPassword(body.email);
    return { message: 'Password reset email sent successfully' };
  }
>>>>>>> da6bbd93e8b938c1f3f6d101e0357d1c72940aa3
  
 
}

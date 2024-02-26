
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "./hash.service";
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import { User, UserDocument } from "src/schemas/user.schema"; // Assurez-vous que l'importation est correcte

@Injectable()
export class AuthService {
   private readonly logger = new Logger();
    private readonly resetTokens: Record<string, { userId: string; expirationDate: Date }> = {};

   constructor(
      private usersService : UsersService,
      private jwtService : JwtService,
      private  hashService : HashService
   ) {}

   async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findByUsername(username);
      if (user && await this.hashService.comparePassword(pass, user.password)) {
         const { password, ...result } = user;
         return result;
      }
      return null;
   }

   async login(user: any) {
      const payload = { email: user.email, sub: user.userId };
      return {
         access_token: this.jwtService.sign(payload),
      };
   }

   async signup(email: string, password: string , username: string): Promise<any> {
      const existingUser = await this.usersService.findByUsername(username);
      if (existingUser) {
         throw new ConflictException('User already exists');
      }

      const hashedPassword = await this.hashService.hashPassword(password);
      return await this.usersService.createUser(email, hashedPassword , username);
   }

async forgetPassword(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const resetToken = uuidv4();
     const st = await this.usersService.storePwdToken(resetToken,user._id);

    // Créer le lien de réinitialisation de mot de passe avec le jeton
 const resetPasswordLink = `http://localhost:3000/auth/reset-password?token=${resetToken}`;
    // Créer un objet Sendinblue
    const sendinblue = new SibApiV3Sdk.TransactionalEmailsApi();
    const apiKey = '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'; // Remplacez par votre clé d'API Sendinblue
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKeyV3 = defaultClient.authentications['api-key'];
    apiKeyV3.apiKey = apiKey;

    // Créer le corps de l'e-mail
    const emailParams = {
      sender: { email: 'alaedineibrahim@gmail.com' },
      to: [{ email }],
      subject: 'Reset Your Password',
      htmlContent: `<p>Please click <a href="${resetPasswordLink}">here</a> to reset your password.</p>`,
    };

    // Envoyer l'e-mail
  try {
       await sendinblue.sendTransacEmail(emailParams);
     } catch (error) {
       console.error('Error sending email:', error);
       throw new Error('Failed to send email');
     }
  }
async generateResetToken(userId: string): Promise<string> {
  const token = uuidv4();
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1); // Expiration dans 1 heure
  await this.usersService.updateResetToken(userId, token, expirationDate); // Mettre à jour le token de réinitialisation dans l'utilisateur
  return token;
}

async findByResetToken(token: string): Promise<User> {
  const user = await this.usersService.findByResetToken(token); // Rechercher l'utilisateur par le token de réinitialisation
  if (!user || user.resetPasswordTokenExpiry < new Date()) {
    throw new NotFoundException('Invalid or expired token');
  }
  return user;
}

async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.usersService.findByResetToken(token);
    if (!user) {
        throw new NotFoundException('Invalid or expired token');
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await this.hashService.hashPassword(newPassword);

    // Mettre à jour le mot de passe de l'utilisateur dans la base de données
    await this.usersService.updatePassword(user._id, hashedPassword);

    // Effacer le jeton de réinitialisation de mot de passe dans la base de données
    await this.usersService.clearResetToken(user._id);
   }


}

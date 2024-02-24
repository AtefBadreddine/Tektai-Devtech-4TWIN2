import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "./hash.service";
import * as nodemailer from 'nodemailer';
import { NotFoundException } from '@nestjs/common';
<<<<<<< HEAD
import { v4 as uuidv4 } from 'uuid';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';

=======
import * as smtpTransport from 'nodemailer-smtp-transport';
>>>>>>> da6bbd93e8b938c1f3f6d101e0357d1c72940aa3
@Injectable()
export class AuthService {
  private readonly logger = new Logger();
  constructor(private usersService : UsersService, private jwtService : JwtService , private  hashService : HashService) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && await this.hashService.comparePassword(pass,user.password)) {
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
<<<<<<< HEAD
  
   async forgetPassword(email: string): Promise<void> {
=======
  async forgetPassword(email: string): Promise<void> {
>>>>>>> da6bbd93e8b938c1f3f6d101e0357d1c72940aa3
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
<<<<<<< HEAD
    const resetToken = uuidv4();
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
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.usersService.findByResetToken(token);
    if (!user) {
      throw new NotFoundException('Invalid or expired token');
    }

    // Hasher le nouveau mot de passe
    const hashedPassword = await this.hashService.hashPassword(newPassword);

    // Mettre à jour le mot de passe de l'utilisateur dans la base de données
    await this.usersService.updatePassword(user.password, hashedPassword);

    // Effacer le jeton de réinitialisation de mot de passe dans la base de données
    await this.usersService.clearResetToken(user.password);
  }

=======

    // Générer un jeton de réinitialisation de mot de passe avec une durée de validité limitée (par exemple, 1 heure)
    const resetToken = this.jwtService.sign({ email }, { expiresIn: '1h' });

    // Configurer le transporteur SMTP pour envoyer des e-mails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'alaedineibrahim@gmail.com',
        pass: 'sabouna123',
      },
    });

    // Envoyer un e-mail de réinitialisation de mot de passe à l'utilisateur
    await transporter.sendMail({
      from: 'alaedineibrahim@gmail.com',
      to: email,
      subject: 'Reset Your Password',
      html: `<p>Please click <a href="http://localhost:3000/reset-password?token=${resetToken}">here</a> to reset your password.</p>`,
    });

   
  }
>>>>>>> da6bbd93e8b938c1f3f6d101e0357d1c72940aa3

  
}

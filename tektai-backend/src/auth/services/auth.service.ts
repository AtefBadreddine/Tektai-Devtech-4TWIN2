
import {ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException} from "@nestjs/common";

import { UsersService } from "../../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "./hash.service";
import {UserDto} from "../../users/user.dto";
import {User, UserDocument} from "../../schemas/user.schema";
import { v4 as uuidv4 } from 'uuid';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import * as process from "process";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";



@Injectable()
export class AuthService {
  private readonly logger = new Logger();
  constructor(private usersService : UsersService
              , private jwtService : JwtService
              , private  hashService : HashService) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (user && await this.hashService.comparePassword(pass,user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any,rememberMe: boolean = false) {
      const expiresIn = rememberMe ? '7d' : '1d';
      const { _id, username, email, isBlocked, role, image } = user;

      return {
      access_token: this.jwtService.sign({ _id, username, email, isBlocked, role, image },{ expiresIn : expiresIn }),
    };
  }
  async signup(userDTO : UserDto): Promise<any> {
    const existingUser = await this.usersService.findByUsername(userDTO.username);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    userDTO.password = await this.hashService.hashPassword(userDTO.password);

    return await this.usersService.createUser(userDTO);
  }
  async forgetPassword(email: string): Promise<void> {
    const user  = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const resetToken = uuidv4();
    await this.usersService.storePwdToken(resetToken,user._id);
    const resetPasswordLink = `http://localhost:5173/forget-password?token=${resetToken}`;

    const sendinblue = new SibApiV3Sdk.TransactionalEmailsApi();
    const apiKey = process.env.SENDINBLUE;
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKeyV3 = defaultClient.authentications['api-key'];
    apiKeyV3.apiKey = apiKey;

    // Créer le corps de l'e-mail
    const emailParams = {
      sender: { email: 'alaedineibrahim@gmail.com' },
      to: [{ email }],
      subject: 'Reset Your Password',
      htmlContent: `
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>
          /* Reset CSS */
          body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            font-size: 16px;
          }
          /* Container styles */
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f7f7f7;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }
          /* Logo styles */
          .logo {
            margin-bottom: 20px;
          }
          /* Heading styles */
          h1 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 10px;
          }
          /* Paragraph styles */
          p {
            font-size: 16px;
            color: #666666;
            line-height: 1.6;
            margin-bottom: 20px;
          }
          /* Button styles */
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #0091ff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Logo -->
          <div class="logo">
       <img src="./image.png" alt="">
          </div>
          <!-- Heading -->
          <h1>Reset Your Password</h1>
          <!-- Content -->
          <p>Please click the button below to reset your password.</p>
          <!-- Button -->
          <a href="${resetPasswordLink}" class="button">Reset Password</a>
      </div>
      </body>
      </html>
      `,
    };

    // Envoyer l'e-mail
    try {
      await sendinblue.sendTransacEmail(emailParams);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async resetPassword(token: string,  newPassword: string): Promise<void> {
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

  async changePassword(email: string, currentPassword: string, newPassword: string): Promise<void> {
    try {
        // Récupérer l'utilisateur à partir de l'email
        const user = await this.usersService.findByEmail(email);
        
        // Vérifier si l'utilisateur existe
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Vérifier si le mot de passe actuel est correct
        const isPasswordCorrect = await this.hashService.comparePassword(currentPassword, user.password);
        if (!isPasswordCorrect) {
            throw new ConflictException('Current password is incorrect');
        }

        // Hasher le nouveau mot de passe
        const hashedNewPassword = await this.hashService.hashPassword(newPassword);

        // Mettre à jour le mot de passe de l'utilisateur dans la base de données
        await this.usersService.updatePassword(user._id, hashedNewPassword);
    } catch (error) {
        console.error('Error changing password:', error);
        if (error instanceof NotFoundException) {
            throw new NotFoundException('User not found');
        } else if (error instanceof ConflictException) {
            throw new ConflictException('Current password is incorrect');
        } else {
            throw new InternalServerErrorException('Failed to change password');
        }
    }
}


}

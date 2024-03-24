
import {ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException} from "@nestjs/common";

import { UsersService } from "../../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "./hash.service";
import {UserDto} from "../../users/user.dto";

import { v4 as uuidv4 } from 'uuid';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import * as process from "process";
import { ResetPasswordDto } from "src/schemas/reset-password.dto";

;

@Injectable()
export class AuthService {
  private readonly logger = new Logger();
  constructor(private usersService : UsersService, private jwtService : JwtService , private  hashService : HashService) {
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

    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload,{ expiresIn : expiresIn }),
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
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const resetToken = uuidv4();
    const st = await this.usersService.storePwdToken(resetToken,user._id);

    // Créer le lien de réinitialisation de mot de passe avec le jeton
    let resetPasswordLink = `http://localhost:3000/auth/reset-password?token=${resetToken}`;
     resetPasswordLink = `http://localhost:5173/forget-password?token=${resetToken}`;
    // Créer un objet Sendinblue
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
  
 
 
async resetPassword(dto: ResetPasswordDto): Promise<void> {
  const { verificationCode, email, newPassword } = dto;
  
  // Vérifier si l'utilisateur avec cet email existe et si le code de vérification est correct
  const user = await this.usersService.findByEmail(email);
  if (!user || user.verificationCode !== verificationCode) {
    throw new NotFoundException('Invalid or expired verification code');
  }

  // Hasher le nouveau mot de passe
  const hashedPassword = await this.hashService.hashPassword(newPassword);

  // Mettre à jour le mot de passe de l'utilisateur dans la base de données
  await this.usersService.updatePassword(user._id, hashedPassword);

  // Effacer le code de vérification dans la base de données
  await this.usersService.clearVerificationCode(user._id);
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

async forgextPassword(email: string): Promise<void> {
  const sendinblue = new SibApiV3Sdk.TransactionalEmailsApi();
    const apiKey = process.env.SENDINBLUE;
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKeyV3 = defaultClient.authentications['api-key'];
    apiKeyV3.apiKey = apiKey;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Générer le code de vérification à 6 chiffres
    const verificationCode =await this.generateVerificationCode();

    // Stocker le code de vérification dans la base de données
    await this.usersService.storeVerificationCode(verificationCode, user._id);

    // Créer le corps de l'e-mail avec le code de vérification
    const emailParams = {
      sender: { email: 'alaedineibrahim@gmail.com' },
      to: [{ email }],
      subject: 'Reset Your Password',
      htmlContent: `<p>Your verification code is: ${verificationCode}</p>`,
    };

    // Envoyer l'e-mail
    try {
      await sendinblue.sendTransacEmail(emailParams);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
}

async generateVerificationCode(): Promise<string> {
    return Math.floor(100000 + Math.random() * 900000).toString();
}








}

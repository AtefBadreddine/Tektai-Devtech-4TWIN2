
import {ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException} from "@nestjs/common";

import { UsersService } from "../../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "./hash.service";
import {UserDto} from "../../users/user.dto";
import {User} from "../../schemas/user.schema";
import { v4 as uuidv4 } from 'uuid';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import * as process from "process";

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

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
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
  async generateResetToken(userId: string): Promise<string> {
    const token = uuidv4();
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1); // Expiration dans 1 heure
    await this.usersService.updateResetToken(userId, token, expirationDate); // Mettre à jour le token de réinitialisation dans l'utilisateur
    return token;
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
 async validateOAuthLogin(profile: any): Promise<User> {
    console.log("Profile received from GitHub:", profile);

    // Vérifiez si la propriété username est définie dans le profil GitHub
    if (!profile || !profile._json || !profile._json.username) {
        console.error("Error: Username not found in GitHub profile.");
        throw new Error("Username not found in GitHub profile.");
    }

    const { username, email } = profile._json;
    console.log("Username:", username);
    console.log("Email:", email);

    // Vérifiez si l'utilisateur existe déjà dans votre base de données
    let user = await this.usersService.findByEmail(email);

    // Si l'utilisateur n'existe pas, créez-en un nouveau
    if (!user) {
        console.log("User not found in the database. Creating a new user...");
        // Créez un nouvel utilisateur avec les informations du profil GitHub
        user = await this.usersService.createUser({
            username: username,
            email: email,
            password: "",
            phoneNumber: "",
            bio: "",
            birthday: "",
            companyName: "",
            adresse: "",
            role: ""
        });
        console.log("New user created:", user);
    } else {
        console.log("User found in the database:", user);
    }

    // Retournez l'utilisateur créé ou trouvé
    return user;
}
}

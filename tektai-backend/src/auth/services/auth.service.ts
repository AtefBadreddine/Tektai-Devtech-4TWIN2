import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "./hash.service";
import * as nodemailer from 'nodemailer';
import { NotFoundException } from '@nestjs/common';
import * as smtpTransport from 'nodemailer-smtp-transport';
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
  async forgetPassword(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

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

  
}

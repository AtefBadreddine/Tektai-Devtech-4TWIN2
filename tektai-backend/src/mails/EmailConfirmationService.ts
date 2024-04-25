import {BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import {User, UserDocument} from "../schemas/user.schema";
import { JwtService } from "@nestjs/jwt";
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import * as process from "process";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class EmailConfirmationService {
    private readonly logger = new Logger();
    constructor(
        private jwtService : JwtService
    ) {}

    public  getEmailContent(): string {
        const filePath = path.join(__dirname, '..', '..', 'views', 'confirm-email.hbs');
        // Synchronously read the file content
        return fs.readFileSync(filePath, 'utf-8');
    }
    public async sendVerificationLink(email: string) {


        const token = this.jwtService.sign({ email }, { expiresIn : '7d' });

        const url = `http://localhost:5173/confirm-mail?token=${token}`;


        const sendinblue = new SibApiV3Sdk.TransactionalEmailsApi();
        const apiKey = process.env.SENDINBLUE;
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        const apiKeyV3 = defaultClient.authentications['api-key'];
        apiKeyV3.apiKey = apiKey;

        // Créer le corps de l'e-mail
        const emailParams = {
            sender: { email: 'tektai@gmail.com',name : 'Tektai' },
            to: [{ email }],
            subject: 'Confirm your email',
            htmlContent: this.getEmailContent(),
            params: {
                url: url,
            },
        };

        // Envoyer l'e-mail
        try {
            await sendinblue.sendTransacEmail(emailParams);
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }

    }

    public async decodeConfirmationToken(token: string) {
        try {
            const payload = await this.jwtService.verify(token);

            if (typeof payload === 'object' && 'email' in payload) {
                return payload.email;
            }
           return null
        } catch (error) {
            return null
        }
    }


}

import {
    Controller,

    Logger,
    Get,
    Req, Render, Post, Body, HttpException, HttpStatus,


} from "@nestjs/common";



import {Request} from "express";
import {EmailConfirmationService} from "./EmailConfirmationService";
import {UsersService} from "../users/users.service";

@Controller('mails')
export class MailController {
    private readonly logger = new Logger();
    constructor(private emailConfirmationService : EmailConfirmationService,
                private userService : UsersService) {}



    @Get('send/confirm-mail')
    async sendConfirmEmail() {
        return this.emailConfirmationService.sendVerificationLink('atefbadreddine05@gmail.com');
    }

    @Post('confirm-mail')
    async confirmEmail(@Body() token: string) {
        try {
            const mail = await this.emailConfirmationService.decodeConfirmationToken(token);
            if (mail) {
                await this.userService.markEmailAsConfirmed(mail);
                return { message: 'Email confirmed successfully' };
            } else {
                throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
            }
        } catch (error) {
            throw new HttpException('An error occurred while confirming email', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

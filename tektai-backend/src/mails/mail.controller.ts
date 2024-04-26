import {
    Controller,

    Logger,
    Get,
    Req, Render, Post, Body, HttpException, HttpStatus, Res,


} from "@nestjs/common";
import { Response } from 'express';



import {Request} from "express";
import {EmailConfirmationService} from "./EmailConfirmationService";
import {UsersService} from "../users/users.service";

@Controller('mails')
export class MailController {
    private readonly logger = new Logger();
    constructor(private emailConfirmationService : EmailConfirmationService,
                private userService : UsersService) {}



    @Post('confirm-mail')
    async confirmEmail(@Body('token') token: string, @Res() res: Response) {
        try {
            this.logger.log(token)
            const mail = await this.emailConfirmationService.decodeConfirmationToken(token);
            this.logger.log(mail,'CONFIRM MAIL')
            if (mail) {
                await this.userService.markEmailAsConfirmed(mail);
                return res.status(HttpStatus.OK).json({
                    message: 'Email confirmed successfully'
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Invalid or expired token'
                });
            }
        } catch (error) {
            this.logger.log(error.message,'CONFIRM MAIL error')
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Invalid or expired token'
            });        }
    }

}

import { Module } from '@nestjs/common';
import {MailController} from "./mail.controller";
import {EmailConfirmationService} from "./EmailConfirmationService";
import {UsersService} from "../users/users.service";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        UsersModule
    ],
    providers: [EmailConfirmationService],
    controllers: [MailController],
})
export class MailsModule {}

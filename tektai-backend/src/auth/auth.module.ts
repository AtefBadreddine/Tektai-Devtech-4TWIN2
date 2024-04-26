import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { HashService } from "./services/hash.service";
import * as process from 'process';
import { ConfigModule } from "@nestjs/config";
import { GithubStrategy } from './strategies/github.strategy';
import {GoogleStrategy} from "./strategies/google.strategy";
import {EmailConfirmationService} from "../mails/EmailConfirmationService";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret : process.env.SECRET_KEY,
      signOptions : {expiresIn : '1h'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy,HashService,GithubStrategy,GoogleStrategy,EmailConfirmationService]
})
export class AuthModule {}

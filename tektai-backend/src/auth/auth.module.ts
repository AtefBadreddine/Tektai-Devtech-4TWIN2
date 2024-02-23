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

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret : process.env.SECRET_KEY,
      signOptions : {expiresIn : '99999s'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy,HashService]
})
export class AuthModule {}

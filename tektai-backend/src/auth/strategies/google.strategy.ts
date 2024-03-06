import {Injectable, Logger} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import * as process from "process";
import {UsersService} from "../../users/users.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger();
    constructor(
        private usersService: UsersService,
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENTSECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['profile', 'email'],
        });
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { id, displayName, email, photos } = profile;
        const userInDB = await this.usersService.findByEmail(email);

        if (userInDB) done(null,userInDB);

        const user = {
            provider: 'google',
            providerId: id,
            email: email,
            name: displayName,
            picture: photos[0].value,
            didNotFinishSignup : true
        };

        done(null, user);
    }
}
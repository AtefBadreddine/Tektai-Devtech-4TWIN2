import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { UsersService } from 'src/users/users.service'; 
import { HashService } from '../services/hash.service';
import axios from 'axios';
import {VerifyCallback} from "passport-google-oauth2";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(GithubStrategy.name);
  constructor(
    private readonly usersService: UsersService,
     private readonly hashService: HashService,

  ) {
    super({
      clientID: '7efefb71654da4d15244',
      clientSecret: '21ac105a6e1697a32abb4d40de391e300ca00dfd',
      callbackURL: 'http://localhost:3000/auth/github/callback',
      scope: [ 'user:email' ],
    });
  }
async validate(accessToken: string, refreshToken: string, profile: any,done: VerifyCallback) {
 

  const response = await axios.get(`https://api.github.com/user/emails`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });
   const emails = response.data;
  let email = "";
  const primaryEmails = emails.filter(email => email.primary === true);
  if (primaryEmails.length > 0) {
     email = primaryEmails[0].email;
  }

  const username = profile._json.login;

  const userInDB = await this.usersService.findByEmail(email);

  if (userInDB) done(null,userInDB);

  const user = {
    provider: 'github',
    providerId: profile._json.id,
    email: email,
    name: username,
    picture: profile._json.avatar_url,
    didNotFinishSignup : true
  };

  done(null, user);
}

}

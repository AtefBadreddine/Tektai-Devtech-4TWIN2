import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, Logger} from '@nestjs/common';
import * as process from "process";
import {User, UserDocument} from "../../schemas/user.schema";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger();
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return {
      _id: payload._id,
      username: payload.username,
      email: payload.email,
      isBlocked: payload.isBlocked,
      role: payload.role,
      image: payload.image
    };
  }

}
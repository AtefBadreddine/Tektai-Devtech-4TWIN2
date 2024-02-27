import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "./hash.service";
import {UserDto} from "../../users/user.dto";

@Injectable()
export class AuthService {
  private readonly logger = new Logger();
  constructor(private usersService : UsersService, private jwtService : JwtService , private  hashService : HashService) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && await this.hashService.comparePassword(pass,user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  async signup(userDTO : UserDto): Promise<any> {
    const existingUser = await this.usersService.findByUsername(userDTO.username);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    userDTO.password = await this.hashService.hashPassword(userDTO.password);

    return await this.usersService.createUser(userDTO);
  }
}

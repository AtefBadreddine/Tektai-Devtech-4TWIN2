import { AuthService } from "./services/auth.service";
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Logger,
  HttpException, HttpStatus
} from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { UsersService } from "src/users/users.service";
import {UserDto} from "../users/user.dto";

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger();
  constructor(private authService: AuthService,private  userService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Post('signup')
  async signUp(@Body() signUpDto: UserDto): Promise<any> {
    const validRoles = ['challenger', 'company', 'admin'];
    if (!signUpDto.username || !signUpDto.email || !signUpDto.password || !validRoles.includes(signUpDto.role.toLowerCase())) {
      throw new HttpException(
          'Invalid data format!',
          HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const user = await this.authService.signup(signUpDto);
      return {
        statusCode : 201,
        message: 'User registered successfully!',
        user,
      };
    } catch (error) {
      this.logger.log(error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}

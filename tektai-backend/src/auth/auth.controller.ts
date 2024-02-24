import { AuthService } from "./services/auth.service";
import { Controller, Request, Post, UseGuards, Body, Logger, Get, Req, Query } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { UsersService } from "src/users/users.service";

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
  async signUp(@Body() signUpDto: any): Promise<any> {
    const { email , username , password} = signUpDto;
    return this.authService.signup(email, password , username);
  }
  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getAllUsers(): Promise<any[]> {
    return this.userService.getAllUsers();
  }
  // @UseGuards(JwtAuthGuard)
  // @Get('getuser')
  // async getProfile(@Req() req) {
  //   return req.user;
  // }
  @UseGuards(JwtAuthGuard)
  @Get('getuser')
  @UseGuards(JwtAuthGuard)
  async findUserbyusenae(@Query('username') username: string) { // Modify to accept username as a query parameter
    return await this.userService.findUserByUsername(username); // Use the username from the query parameter
  }
}

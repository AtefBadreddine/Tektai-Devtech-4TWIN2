import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from "./schemas/user.schema";
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  [x: string]: any;
  constructor(private readonly appService: AppService, private readonly usersService: UsersService, // Inject the UsersService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('user')
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
}

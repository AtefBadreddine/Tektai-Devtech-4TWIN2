import {
  Controller,
  UseGuards,
  Logger,
  Get,
   Param, Delete, NotFoundException, InternalServerErrorException, Put, Body, Query, UploadedFile, UseInterceptors,

} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UsersService } from "src/users/users.service";
import {User} from "../schemas/user.schema";
import {UserDto} from "./user.dto";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('users')
export class UserController {
  private readonly logger = new Logger();
  constructor(private  userService: UsersService) {}

  //@UseGuards(JwtAuthGuard)
  @Get('getall')
  async getAllUsers(): Promise<any[]> {
      return this.userService.getAllUsers();
  }

  @Get('get/:username')
  // @UseGuards(JwtAuthGuard)
  async findByUsername(@Param('username') username: string) {
      return await this.userService.findUserByUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<User | null> {
      try {
          const user = await this.userService.deleteUser(userId);
          if (!user) {
              throw new NotFoundException('User not found');
          }
          return user;
      } catch (error) {
          throw new InternalServerErrorException('Failed to delete user');
      }
  }

  //@UseGuards(JwtAuthGuard)
  @Put(':userId')
  @UseInterceptors(FileInterceptor('file')) // Use FileInterceptor for handling file uploads
  async updateUser(
    @Param('userId') userId: string,
    @Body() userDto: UserDto,
    @UploadedFile() file: Express.Multer.File, // Use @UploadedFile() for file parameter
  ) {
    return await this.userService.updateUser(userId, userDto, file);
  }


  @Get('searchusers')
async searchUsers(@Query() query: any): Promise<User[]> {
const users = await this.userService.searchUsers(query);
return users || [];
}


}
export default UserController; // Add this line for default export

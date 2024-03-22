import {
    Controller,
    UseGuards,
    Logger,
    Get,
    Query,
    Param,
    Delete,
    NotFoundException,
    InternalServerErrorException,
    Put,
    Body,
    Req,
    Request,
    UseInterceptors,
    ClassSerializerInterceptor,

} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UsersService } from "src/users/users.service";
import {User} from "../schemas/user.schema";
import {UserDto} from "./user.dto";


@Controller('users')
export class UserController {
    private readonly logger = new Logger();
    constructor(private  userService: UsersService) {}


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return this.userService.findById(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getall')
    async getAllUsers(): Promise<any[]> {
        return this.userService.getAllUsers();
    }

    @Get('get/:username')
    // @UseGuards(JwtAuthGuard)
    async findByUsername(@Param('username') username: string) {
        return await this.userService.findUserByUsername(username);
    }
    
    @Get('getById/:userId') // Define the route for getById endpoint
    async getUserById(@Param('userId') userId: string): Promise<User> { // Define the method to handle getById logic
        return await this.userService.findById(userId); // Call the findById method of UsersService
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

    // @UseGuards(JwtAuthGuard)
    @Put(':userId')
    async updateUser(@Param('userId') userId: string, @Body() userDto: UserDto) {
        return await this.userService.updateUser(userId, userDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/block/:userId')
    async blockUser(@Param('userId') userId: string) {
        return await this.userService.blockUser(userId);
    }

    @Get('searchusers')
async searchUsers(@Query() query: any): Promise<User[]> {
  const users = await this.userService.searchUsers(query);
  return users || [];
}

}

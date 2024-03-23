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
    Request,

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

    @Get('/get/:id')
    // @UseGuards(JwtAuthGuard)
    async getById(@Param('id') id: string) {
        this.logger.log(id);
        return await this.userService.findById(id);
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

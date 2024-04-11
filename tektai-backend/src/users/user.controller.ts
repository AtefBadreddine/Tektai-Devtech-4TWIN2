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

    UseInterceptors,
    UploadedFile,
    Post,


} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UsersService } from "src/users/users.service";
import {User} from "../schemas/user.schema";
import {UserDto} from "./user.dto";
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from "@nestjs/passport";

@Controller('users')
export class UserController {
    private readonly logger = new Logger();
    constructor(private  userService: UsersService) {}


    // @UseGuards(JwtAuthGuard)
    @Get('profile/:userId')
    async getProfile(@Param('userId') userId: string) {
        return await this.userService.findById(userId);
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

    @UseGuards(JwtAuthGuard)
    @Put(':userId')
    // @UseInterceptors(FileInterceptor('file')) // Use FileInterceptor for handling file uploads
    async updateUser(
        @Param('userId') userId: string,
        @Body() userDto: UserDto,
        // @UploadedFile() file: Express.Multer.File, // Use @UploadedFile() for file parameter
        ) {
        return await this.userService.updateUser(
            userId, 
            userDto
            // file
            );
    }

    //@UseGuards(JwtAuthGuard)
    @Put('/upload/:userId')
    @UseInterceptors(FileInterceptor('image')) // Use FileInterceptor for handling image uploads
    async uploadProfileImage(
        @Param('userId') userId: string,
        @Body() userDto: UserDto,
        @UploadedFile() image: Express.Multer.File,
        ) {
        return await this.userService.uploadProfileImage(userId, userDto, image);
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
@Get(':userId') // Define route to get user by ID
async getUserById(@Param('userId') userId: string): Promise<User> {
    const user = await this.userService.findById(userId);
    if (!user) {
        throw new NotFoundException('User not found');
    }
    return user;
}


///Favorite Liste///////////////////

//@UseGuards(AuthGuard('jwt'))
//@UseGuards(JwtAuthGuard)
@Post(':id/favorites/add/:challengeId')
async addFavoriteChallenge(@Param('id') userId: string, @Param('challengeId') challengeId: string) {
  return this.userService.addFavoriteChallenge(userId, challengeId);
}

@Delete(':userId/favorites/remove/:challengeId')
async removeFavoriteChallenge(
  @Param('userId') userId: string,
  @Param('challengeId') challengeId: string,
): Promise<void> {
  await this.userService.removeFavoriteChallenge(userId, challengeId);
}

//Checking if a Challenge is in Favorites
@Get(':userId/favorites/check/:challengeId')
  async checkFavoriteChallenge(
    @Param('userId') userId: string,
    @Param('challengeId') challengeId: string,
  ): Promise<{ isFavorite: boolean }> {
    return await this.userService.checkFavoriteChallenge(userId, challengeId);
  }

  @Get(':userId/favorites')
  async getUserFavorites(@Param('userId') userId: string): Promise<string[]> {
    return await this.userService.getUserFavorites(userId);
  }


}

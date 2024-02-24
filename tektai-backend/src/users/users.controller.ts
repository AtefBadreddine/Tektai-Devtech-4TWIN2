import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.addUser(createUserDto);
    return { message: 'User created successfully', user: newUser };
  }

  @Patch(':id')
  async updateUser(@Param('id') userId: number, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.updateUser(userId, updateUserDto);
    return { message: 'User updated successfully', user: updatedUser };
  }
}

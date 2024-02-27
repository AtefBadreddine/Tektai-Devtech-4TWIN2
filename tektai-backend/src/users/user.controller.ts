import {
    Controller,
    UseGuards,
    Logger,
    Get,
    Query, Param,

} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UsersService } from "src/users/users.service";


@Controller('users')
export class UserController {
    private readonly logger = new Logger();
    constructor(private  userService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('getall')
    async getAllUsers(): Promise<any[]> {
        return this.userService.getAllUsers();
    }

    @Get('get/:username')
    @UseGuards(JwtAuthGuard)
    async findByUsername(@Param('username') username: string) {
        return await this.userService.findUserByUsername(username);
    }
}

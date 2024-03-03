import { UsersService } from "../../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "./hash.service";
import { UserDto } from "../../users/user.dto";
import { User } from "src/schemas/user.schema";
export declare class AuthService {
    private usersService;
    private jwtService;
    private hashService;
    private readonly logger;
    constructor(usersService: UsersService, jwtService: JwtService, hashService: HashService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    signup(userDTO: UserDto): Promise<any>;
    forgetPassword(email: string): Promise<void>;
    generateResetToken(userId: string): Promise<string>;
    resetPassword(token: string, newPassword: string): Promise<void>;
    changePassword(email: string, currentPassword: string, newPassword: string): Promise<void>;
    validateOAuthLogin(profile: any): Promise<User>;
}

import { UsersService } from "../../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "./hash.service";
import { User } from "src/schemas/user.schema";
export declare class AuthService {
    private usersService;
    private jwtService;
    private hashService;
    private readonly logger;
    private readonly resetTokens;
    constructor(usersService: UsersService, jwtService: JwtService, hashService: HashService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    signup(email: string, password: string, username: string): Promise<any>;
    forgetPassword(email: string): Promise<void>;
    generateResetToken(userId: string): Promise<string>;
    findByResetToken(token: string): Promise<User>;
    resetPassword(token: string, newPassword: string): Promise<void>;
}

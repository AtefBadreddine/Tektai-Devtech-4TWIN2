import { AuthService } from "./services/auth.service";
import { UsersService } from "src/users/users.service";
import { ResetPasswordDto } from "src/schemas/reset-password.dto";
export declare class AuthController {
    private authService;
    private usersService;
    private readonly logger;
    constructor(authService: AuthService, usersService: UsersService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    signUp(signUpDto: any): Promise<any>;
    forgetPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}

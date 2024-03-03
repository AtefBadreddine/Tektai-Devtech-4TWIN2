import { AuthService } from "./services/auth.service";
import { UsersService } from "src/users/users.service";
import { UserDto } from "../users/user.dto";
import { ResetPasswordDto } from "../schemas/reset-password.dto";
export declare class AuthController {
    private authService;
    private userService;
    private readonly logger;
    constructor(authService: AuthService, userService: UsersService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    signUp(signUpDto: UserDto): Promise<any>;
    forgetPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    changePassword(email: string, currentPassword: string, newPassword: string): Promise<void>;
    validateOAuthLogin(profile: any): Promise<{
        user: import("../schemas/user.schema").User;
        error?: undefined;
    } | {
        error: any;
        user?: undefined;
    }>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const hash_service_1 = require("./hash.service");
const common_2 = require("@nestjs/common");
const uuid_1 = require("uuid");
const SibApiV3Sdk = require("sib-api-v3-sdk");
let AuthService = class AuthService {
    constructor(usersService, jwtService, hashService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.hashService = hashService;
        this.logger = new common_1.Logger();
        this.resetTokens = {};
    }
    async validateUser(username, pass) {
        const user = await this.usersService.findByUsername(username);
        if (user && await this.hashService.comparePassword(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async signup(email, password, username) {
        const existingUser = await this.usersService.findByUsername(username);
        if (existingUser) {
            throw new common_1.ConflictException('User already exists');
        }
        const hashedPassword = await this.hashService.hashPassword(password);
        return await this.usersService.createUser(email, hashedPassword, username);
    }
    async forgetPassword(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_2.NotFoundException('User not found');
        }
        const resetToken = (0, uuid_1.v4)();
        const st = await this.usersService.storePwdToken(resetToken, user._id);
        const resetPasswordLink = `http://localhost:3000/auth/reset-password?token=${resetToken}`;
        const sendinblue = new SibApiV3Sdk.TransactionalEmailsApi();
        const apiKey = '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';
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        const apiKeyV3 = defaultClient.authentications['api-key'];
        apiKeyV3.apiKey = apiKey;
        const emailParams = {
            sender: { email: 'alaedineibrahim@gmail.com' },
            to: [{ email }],
            subject: 'Reset Your Password',
            htmlContent: `<p>Please click <a href="${resetPasswordLink}">here</a> to reset your password.</p>`,
        };
        try {
            await sendinblue.sendTransacEmail(emailParams);
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }
    async generateResetToken(userId) {
        const token = (0, uuid_1.v4)();
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);
        await this.usersService.updateResetToken(userId, token, expirationDate);
        return token;
    }
    async findByResetToken(token) {
        const user = await this.usersService.findByResetToken(token);
        if (!user || user.resetPasswordTokenExpiry < new Date()) {
            throw new common_2.NotFoundException('Invalid or expired token');
        }
        return user;
    }
    async resetPassword(token, newPassword) {
        const user = await this.usersService.findByResetToken(token);
        if (!user) {
            throw new common_2.NotFoundException('Invalid or expired token');
        }
        const hashedPassword = await this.hashService.hashPassword(newPassword);
        await this.usersService.updatePassword(user._id, hashedPassword);
        await this.usersService.clearResetToken(user._id);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        hash_service_1.HashService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const mongodb_1 = require("mongodb");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
        this.logger = new common_1.Logger();
    }
    async findByUsername(username) {
        return this.userModel.findOne({ username });
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email });
    }
    async createUser(email, password, username) {
        const user = new this.userModel({ email, password, username });
        return user.save();
    }
    async storePwdToken(token, id) {
        const user = await this.userModel.findById(new mongodb_1.default.ObjectId(id)).exec();
        user.resetPasswordToken = token;
        return await user.save();
    }
    async deleteUser(userId) {
        try {
            const user = await this.userModel.findByIdAndDelete(userId);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete user');
        }
    }
    async findByResetToken(token) {
        this.logger.log(`Searching for user with reset token: ${token}`);
        const user = await this.userModel.findOne({ resetPasswordToken: token }).exec();
        if (!user) {
            this.logger.error(`User not found for reset token: ${token}`);
        }
        return user;
    }
    async clearResetToken(userId) {
        this.logger.log(`Clearing reset token for user: ${userId}`);
        await this.userModel.findByIdAndUpdate(userId, { resetPasswordToken: null }).exec();
        this.logger.log(`Reset token cleared successfully for user: ${userId}`);
    }
    async updatePassword(userId, newPassword) {
        this.logger.log(`Updating password for user: ${userId}`);
        await this.userModel.findByIdAndUpdate(userId, { password: newPassword }).exec();
        this.logger.log(`Password updated successfully for user: ${userId}`);
    }
    async updateResetToken(userId, token, expirationDate) {
        this.logger.log(`Updating reset token for user: ${userId}`);
        await this.userModel.findByIdAndUpdate(userId, { resetPasswordToken: token, resetPasswordTokenExpiry: expirationDate }).exec();
        this.logger.log(`Reset token updated successfully for user: ${userId}`);
    }
    async getUserIdByResetToken(token) {
        const user = await this.findByResetToken(token);
        return user?.userId.toString();
    }
    async findById(userId) {
        try {
            const user = await this.userModel.findById(userId).exec();
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to find user by ID');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map
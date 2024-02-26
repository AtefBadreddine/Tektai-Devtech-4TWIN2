import {  Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../schemas/user.schema";
const mongo = require('mongodb');


@Injectable()
export class UsersService {
  private readonly logger = new Logger();
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({username})
  }
   async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }
  async createUser(email: string, password: string , username: string): Promise<User> {
    const user = new this.userModel({ email, password , username });
    return user.save();
  }
    async storePwdToken(token: string, id: string) {
      const user = await this.userModel.findById(new mongo.ObjectId(id)).exec();
      user.resetPasswordToken = token;
      return  await user.save();

    }

  async deleteUser(userId: string): Promise<User | null> {
    try {
      const user = await this.userModel.findByIdAndDelete(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
 async findByResetToken(token: string): Promise<User | undefined> {
    this.logger.log(`Searching for user with reset token: ${token}`);
    const user = await this.userModel.findOne({ resetPasswordToken: token }).exec();
    if (!user) {
      this.logger.error(`User not found for reset token: ${token}`);
    }
    return user;
  }

  async clearResetToken(userId: string): Promise<void> {
    this.logger.log(`Clearing reset token for user: ${userId}`);
    await this.userModel.findByIdAndUpdate(userId, { resetPasswordToken: null }).exec();
    this.logger.log(`Reset token cleared successfully for user: ${userId}`);
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    this.logger.log(`Updating password for user: ${userId}`);
    await this.userModel.findByIdAndUpdate(userId, { password: newPassword }).exec();
    this.logger.log(`Password updated successfully for user: ${userId}`);
  }

  async updateResetToken(userId: string, token: string, expirationDate: Date): Promise<void> {
    this.logger.log(`Updating reset token for user: ${userId}`);
    await this.userModel.findByIdAndUpdate(userId, { resetPasswordToken: token, resetPasswordTokenExpiry: expirationDate }).exec();
    this.logger.log(`Reset token updated successfully for user: ${userId}`);
  }

async getUserIdByResetToken(token: string): Promise<string | undefined> {
  const user = await this.findByResetToken(token);
  return user?.userId.toString(); // Convertissez userId en string
}
async findById(userId: string): Promise<User | null> {
    try {
      const user = await this.userModel.findById(userId).exec();
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user by ID');
    }
  }
}

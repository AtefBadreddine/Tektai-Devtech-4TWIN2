<<<<<<< HEAD
import {  Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
=======
import {  Injectable, Logger } from "@nestjs/common";
>>>>>>> da6bbd93e8b938c1f3f6d101e0357d1c72940aa3
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../schemas/user.schema";


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
<<<<<<< HEAD
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
    return this.userModel.findOne({ resetToken: token }).exec();
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { password: newPassword }).exec();
  }

  async clearResetToken(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { resetToken: null }).exec();
  }
=======
>>>>>>> da6bbd93e8b938c1f3f6d101e0357d1c72940aa3
}

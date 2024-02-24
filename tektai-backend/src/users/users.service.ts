import {  Injectable, Logger } from "@nestjs/common";
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
  async createUser(email: string, password: string , username: string): Promise<User> {
    const user = new this.userModel({ email, password , username });
    return user.save();
  }
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.find().exec();
      return JSON.parse(JSON.stringify(users));
    } catch (error) {
      this.logger.error(`Error fetching all users: ${error.message}`);
      throw error;
    }}
    async findUserByUsername(username: string): Promise<User> {
      try {
        const user = await this.userModel.findOne({ username }).exec();
        if (!user) {
          throw new Error(`User with username ${username} not found`);
        }
        return JSON.parse(JSON.stringify(user));
      } catch (error) {
        this.logger.error(`Error fetching user by username ${username}: ${error.message}`);
        throw error;
      }
    }
}

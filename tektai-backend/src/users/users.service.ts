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
}
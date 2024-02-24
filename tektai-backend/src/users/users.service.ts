import {  Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../schemas/user.schema";
import { CreateUserDto } from "./dto/createUser.dto";


@Injectable()
export class UsersService {
  private readonly logger = new Logger();
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }
  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({username})
  }
  async createUser(email: string, password: string, username: string, phoneNumber?: string, image?: string, birthdate?: Date): Promise<User> {
    const user = new this.userModel({ email, password, username, phoneNumber, image, birthdate });
    return user.save();
  }
  async addUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  } 
  async updateUser(userId: number, updateUserDto: Partial<User>): Promise<User> {
    const updatedUser = await this.userModel.findOneAndUpdate({ userId }, updateUserDto, { new: true });
    return updatedUser;
  }
}

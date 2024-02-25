import {  Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
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
  async updateUser(userId: string, updateUserDto: Partial<User>): Promise<User> {
    console.log('Update DTO:', updateUserDto);
    const objectId = new Types.ObjectId(userId);
    const updatedUser = await this.userModel.findByIdAndUpdate(objectId, updateUserDto, { new: true });
    console.log('Updated User:', updatedUser);
    return updatedUser;
  }
  
}

import {Injectable, InternalServerErrorException, Logger, NotFoundException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model, mongo} from "mongoose";
import { User } from "../schemas/user.schema";
import {UserDto} from "./user.dto";
import { extname } from "path";



@Injectable()
export class UsersService {
  private readonly logger = new Logger();
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}


  async findById(id: string): Promise<User> {
    return this.userModel.findById(new mongo.ObjectId(id)).lean();
  }
  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }
  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({
      username :  username
    }).lean()
  }
  async createUser(userDTO : UserDto): Promise<User> {
    const user = new this.userModel(userDTO);
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

   async updateUser(userId: string, userDto: UserDto): Promise<User> {
     const updatedUser = await this.userModel.findByIdAndUpdate(userId, userDto, { new: true });
     if (!updatedUser) {
       throw new NotFoundException('User not found');
     }
     return updatedUser;
   }


  async uploadProfileImage(userId: string, userDto: UserDto, image: Express.Multer.File): Promise<User> {
    try {
      // Check if the user exists
      const existingUser = await this.userModel.findById(userId).exec();
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      // Update user properties
      existingUser.image = userDto.image || existingUser.image;

      // Update the profile image if provided in the DTO
      if (image) {
        // Handle image upload and update the user's image
        const fileExt = extname(image.originalname);
        const uniqueSuffix = `${userId}`; // Generate unique filename with user ID
        const randomFileName = `${uniqueSuffix}${fileExt}`;

        existingUser.image = randomFileName;

      }

      // Save the updated user
      const updatedUser = await existingUser.save();
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user');
    }
  }




  

  async storePwdToken(token: string, id: string) {
    const user = await this.userModel.findById(new mongo.ObjectId(id)).exec();
    user.resetPasswordToken = token;
    return  await user.save();

  }
  async findByResetToken(token: string): Promise<User | undefined> {
    this.logger.log(`Searching for user with reset token: ${token}`);
    const user = await this.userModel.findOne({ resetPasswordToken: token  }).exec();
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
  
  async searchUsers(query: any): Promise<User[] | null> {
    const { username, email, role } = query;
    const searchQuery: any = {};
  
    // Construct query parameters based on provided search criteria
    if (username) {
      searchQuery.username = { $regex: new RegExp(username, 'i') }; // Case-insensitive search
    }
    if (email) {
      searchQuery.email = { $regex: new RegExp(email, 'i') }; // Case-insensitive search
    }
    if (role) {
      searchQuery.$or = [ // Allow multiple roles in the search
        { role },
        { "roles": { $in: [role] } } // Search for role in an array of roles
      ];
    }
  
    // Execute the search using your model
    const users = await this.userModel.find(searchQuery).exec();
    return users || null;
  }
  
  async blockUser(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      return null;
    }
    if (!user?.isBlocked)
      user.isBlocked = true;
    else user.isBlocked = !user.isBlocked;

    return  await user.save();

  }

}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schemas/user.schema";
import {UserController} from "./user.controller";
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Module({
  imports: [
    MongooseModule.forFeature([{ name : User.name , schema : UserSchema}]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Specify the upload directory
        filename: (req, file, callback) => {
          const uniqueSuffix = `user-${Date.now()}}`;
          callback(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  ],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService]
})
export class UsersModule {}

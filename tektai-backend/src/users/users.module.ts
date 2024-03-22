import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schemas/user.schema";
import {UserController} from "./user.controller";
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Module({
  imports: [
    MongooseModule.forFeature([{ name : User.name , schema : UserSchema}]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Specify the upload directory
        filename: (req, file, callback) => {
          const userId = req.body.userId; // Assuming userId is sent in the request body
          const uniqueSuffix = `${userId}-${Date.now()}}`;
          const fileExt = extname(file.originalname);
          const filename = `${uniqueSuffix}${fileExt}`;

          callback(null, filename);
        },
      }),
    }),
  ],  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService]
})
export class UsersModule {}

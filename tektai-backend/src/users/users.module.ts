import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schemas/user.schema";
import { UserController } from "./user.controller";
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path'; // Import extname from path module
import { Request } from 'express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Specify the upload directory
        filename: (req: Request, image, callback) => {
          // Extract userId from the request URL
          const userId = req.params.userId;
          if (!userId) {
            return callback(new Error('UserId is missing in the request URL'), '');
          }
          // Get the image extension
          const fileExt = extname(image.originalname);
          // Use the userId as the filename with the image extension
          const filename = `${userId}${fileExt}`;
          callback(null, filename);
        },
      }),
    }),
  ],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService]
})
export class UsersModule {}

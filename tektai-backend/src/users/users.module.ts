import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schemas/user.schema";
<<<<<<< HEAD
import { UserController } from './users.controller';
=======
import {UserController} from "./user.controller";
>>>>>>> main


@Module({
  imports: [MongooseModule.forFeature([{ name : User.name , schema : UserSchema}])],
  controllers: [UserController],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService]
})
export class UsersModule {}

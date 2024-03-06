import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schemas/user.schema";
import {UserController} from "./user.controller";


@Module({
  imports: [MongooseModule.forFeature([{ name : User.name , schema : UserSchema}])],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService]
})
export class UsersModule {}

import {
  Schema,
  SchemaFactory,
  Prop
} from "@nestjs/mongoose";
import {
  Document
} from 'mongoose';
import * as mongoose from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userId : string;

  @Prop({ default: () => new mongoose.Types.ObjectId() })
  _id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default : null })
  resetPasswordToken: string;

  @Prop({ default: "" })
  phoneNumber: string;

  @Prop({ default: "" })
  bio: string;

  @Prop({ default: "" })
  birthday: string;

  @Prop({ default: "" })
  companyName: string;

  @Prop({ default: "" })
  adresse: string;

  @Prop({ default: "challenger" })
  role: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
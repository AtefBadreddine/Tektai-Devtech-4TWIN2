import {
  Schema,
  SchemaFactory,
  Prop
} from "@nestjs/mongoose";
import {
  Document
} from 'mongoose';
import * as mongoose from "mongoose";
import { Exclude} from 'class-transformer';


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
  @Exclude({ toPlainOnly: true })
  password: string;

  @Prop({ default : null })
  resetPasswordToken: string;

  @Prop({ default: "" })
  phoneNumber: string;

  @Prop({ default: false })
  isBlocked: boolean;

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
    // Ajout de la propriété verificationCode
  @Prop({ default: null })
  verificationCode: string;

   @Prop({ default: "" })
  country: string;

}





export const UserSchema = SchemaFactory.createForClass(User);
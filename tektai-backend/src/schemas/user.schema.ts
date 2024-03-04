import {
  Schema,
  SchemaFactory,
  Prop
} from "@nestjs/mongoose";
import {
  Document, Types
} from 'mongoose';
import * as mongoose from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
<<<<<<< HEAD
  @Prop({ type: String, default: () => new Types.ObjectId().toString() })
  userId :number ;
=======
  @Prop()
  userId : string;
>>>>>>> main

  @Prop({ default: () => new mongoose.Types.ObjectId() })
  _id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

<<<<<<< HEAD
  @Prop()
  phoneNumber: string;

  @Prop()
  image: string;

  @Prop()
  birthdate: Date;
=======
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
>>>>>>> main

}

export const UserSchema = SchemaFactory.createForClass(User);
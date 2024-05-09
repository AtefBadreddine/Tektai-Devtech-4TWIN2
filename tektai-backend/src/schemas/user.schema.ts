import {
  Schema,
  SchemaFactory,
  Prop
} from "@nestjs/mongoose";
import mongoose, {
  Document,
  Types
} from 'mongoose';



export type UserDocument = User & Document;

@Schema()
export class User {


  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true , type : String /*, select : false*/ })
  password: string;

  @Prop({ default : null })
  resetPasswordToken: string;

  @Prop({ default: "" })
  phoneNumber: string;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop({ default: false })
  mailConfirmed: boolean;

  @Prop({ default: "" })
  bio: string;

  @Prop({ default: "free" })
  subscription: string;

  @Prop({ default: "" })
  birthday: string;

  @Prop({ default: "" })
  companyName: string;

  @Prop({ default: "" })
  adresse: string;

  @Prop({ default: "challenger" })
  role: string;

  @Prop({ default: 0 })
  bpts: number;
  @Prop({ default: 0 })
  spts: number;
  @Prop({ default: 0 })
  gpts: number;

  @Prop({ nullable: true, default: null }) 
  image?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Challenges' }], default: [] })
  favoriteChallenges: Types.ObjectId[];

}

export const UserSchema = SchemaFactory.createForClass(User);
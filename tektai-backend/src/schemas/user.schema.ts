import {
  Schema,
  SchemaFactory,
  Prop
} from "@nestjs/mongoose";
import {
  Document
} from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userId : number;

  @Prop({ required: true})
  email: string;

  @Prop({ required: true})
  username: string;

  @Prop({ required: true })
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
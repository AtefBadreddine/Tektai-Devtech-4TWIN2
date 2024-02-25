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
  userId : string;

  @Prop({ required: true})
  email: string;

  @Prop({ required: true})
  username: string;

  @Prop({ required: true })
  password: string;
    @Prop()
  resetPasswordToken: string; // Champ pour stocker le token de réinitialisation

  @Prop()
  resetPasswordTokenExpiry: Date; // Champ pour stocker la date d'expiration du token


}

export const UserSchema = SchemaFactory.createForClass(User);
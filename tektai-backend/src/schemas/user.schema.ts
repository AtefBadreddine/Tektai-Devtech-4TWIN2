import {
  SchemaFactory,
  Prop, Schema,
} from "@nestjs/mongoose";
import {
  Document
} from 'mongoose';

import * as mongoose from 'mongoose';


export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userId: string;

  @Prop( {type: mongoose.Schema.Types.ObjectId})
  _id : string;

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
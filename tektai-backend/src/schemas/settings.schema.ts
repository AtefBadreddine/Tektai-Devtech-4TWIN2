import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingsDocument = Settings & Document;

@Schema()
export class Settings {
  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  termsOfService: string;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);

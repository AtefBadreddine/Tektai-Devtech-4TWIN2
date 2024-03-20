import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingsDocument = Settings & Document;

@Schema()
export class Settings {
  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  termsOfService: string;

  @Prop({ required: true }) // Assuming these are required
  github: string;

  @Prop({ required: true })
  facebook: string;

  @Prop({ required: true })
  linkedin: string;

  @Prop({ required: true })
  twitter: string;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);

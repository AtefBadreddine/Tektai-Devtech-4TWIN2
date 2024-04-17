// localisation.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Localisation extends Document {
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: true })
  latitude: number;
}

export const LocalisationSchema = SchemaFactory.createForClass(Localisation);
export type LocalisationDocument = Localisation & Document;
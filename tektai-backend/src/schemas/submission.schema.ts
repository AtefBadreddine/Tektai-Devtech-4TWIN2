import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubmissionDocument = Submission & Document;

@Schema()
export class Submission {
  @Prop({ required: false })
  TeamId: string;

  @Prop({ type: Buffer, required: false }) // Utilisez Buffer pour stocker les données binaires
  pdf: Buffer;

  @Prop({ type: Buffer, required: false }) // Utilisez Buffer pour stocker les données binaires
  notebook: Buffer;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);

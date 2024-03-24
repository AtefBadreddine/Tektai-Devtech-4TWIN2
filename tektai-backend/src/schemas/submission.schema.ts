import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubmissionDocument = Submission & Document;

@Schema()
export class Submission {
  @Prop({ required: false })
  TeamId: string;

  @Prop({ required: false }) // Type modifié pour stocker le chemin du fichier
  pdf: string;

  @Prop({ required: false }) // Type modifié pour stocker le chemin du fichier
  notebook: string;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);

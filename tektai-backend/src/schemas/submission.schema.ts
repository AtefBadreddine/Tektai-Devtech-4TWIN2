import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubmissionDocument = Submission & Document;

@Schema()
export class Submission {
  @Prop({ required: true })
  teamId: string;

  @Prop({ required: true })
  pdfFilePath: string;

  @Prop({ required: false })
  notebookFilePath: string;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);

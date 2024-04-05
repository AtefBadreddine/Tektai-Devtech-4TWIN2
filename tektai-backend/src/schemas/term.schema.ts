import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TermDocument = Term & Document;

@Schema()
export class Term {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;
}

export const TermSchema = SchemaFactory.createForClass(Term);

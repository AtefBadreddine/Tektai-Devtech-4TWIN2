import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'; // Import Types from mongoose

export type ChallengesDocument = Challenges & Document;

@Schema()
export class Challenges {
  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'User' }) // Use Types.ObjectId
  company_id: Types.ObjectId;

  @Prop()
  prize: string;

@Prop({ enum: ['Anyone', 'Invitation-only'], default: 'Anyone' })
eligible_participants:string;

@Prop({ enum: ['Public', 'Private'], default: 'Public' })
visibility:string;


  @Prop({ enum: ['Ongoing', 'Completed', 'Upcoming'], default: 'Upcoming' })
  status: string;

  @Prop()
  description: string;

  @Prop()
  start_date: Date;

  @Prop()
  deadline: Date;

  @Prop()
  dataset: string;
}

export const ChallengesSchema = SchemaFactory.createForClass(Challenges);

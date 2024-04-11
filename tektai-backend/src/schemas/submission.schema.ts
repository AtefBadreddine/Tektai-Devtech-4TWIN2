import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TeamDocument } from './team.schema';
import { ChallengesDocument } from './challenges.schema';

export type SubmissionDocument = Submission & Document;

@Schema()
export class Submission {
  @Prop({ type: Types.ObjectId, ref: 'Team' }) // Référence à l'équipe
   team: Types.ObjectId | TeamDocument; 

  @Prop({ type: Types.ObjectId, ref: 'Challenges' }) // Référence au défi
  challenge: Types.ObjectId | ChallengesDocument; 

  @Prop({ required: false }) // Type modifié pour stocker le chemin du fichier
  pdf: string;

  @Prop({ required: false }) // Type modifié pour stocker le chemin du fichier
  notebook: string;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);

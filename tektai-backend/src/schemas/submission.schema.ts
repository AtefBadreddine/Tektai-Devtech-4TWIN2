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
   // Ajout des nouvelles propriétés pour les fichiers supplémentaires
    @Prop()
    presentation: string; // Chemin vers le fichier .mp4

    @Prop()
    excel: string; // Chemin vers le fichier .excel

    @Prop()
    archive: string;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);

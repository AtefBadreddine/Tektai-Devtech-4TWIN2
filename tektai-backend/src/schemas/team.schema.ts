import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { UserDocument } from './user.schema';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    leader: UserDocument;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
    members: UserDocument[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);

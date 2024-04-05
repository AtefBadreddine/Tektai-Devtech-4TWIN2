// invitation.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {User, UserDocument} from './user.schema';
import {TeamDocument} from "./team.schema";

export type InvitationDocument = Invitation & Document;

@Schema()
export class Invitation {

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    recipient: UserDocument;

    @Prop({ type: Types.ObjectId, ref: 'Team', required: true })
    team: TeamDocument;

    @Prop({ default: Date.now })
    createdAt: Date;

}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);

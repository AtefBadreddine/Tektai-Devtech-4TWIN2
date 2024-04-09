import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { CommentReplyDto } from '../comments/comments.dto';

export type CommentDocument = Comment & Document;

@Schema()
export class CommentReply {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    senderName: Types.ObjectId;
    
    @Prop()
    description: string;

    @Prop({ default: Date.now })
    date: Date;
}

export const CommentReplySchema = SchemaFactory.createForClass(CommentReply);

@Schema()
export class Comment {
    @Prop()
    userName: string; // Change the type to string

    @Prop()
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'Challenge' })
    challengeId: Types.ObjectId;

    @Prop({ default: Date.now })
    date: Date;

    @Prop({ default: 0 })
    likes: number;

    @Prop({ type: [CommentReplySchema] })
    replies: CommentReplyDto[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

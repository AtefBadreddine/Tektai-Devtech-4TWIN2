import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument, CommentReply }  from 'src/schemas/comments.schema';
import { CommentReplyDto, CommentsDto } from './comments.dto';


@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async incrementLikes(commentId: string): Promise<number> {
    const comment = await this.commentModel.findById(commentId).exec();
    if (!comment) {
      throw new Error('Comment not found');
    }
    comment.likes += 1;
    await comment.save();
    return comment.likes;
  }

  async decrementLikes(commentId: string): Promise<number> {
    const comment = await this.commentModel.findById(commentId).exec();
    if (!comment) {
      throw new Error('Comment not found');
    }
    if (comment.likes > 0) {
      comment.likes -= 1;
    }
    await comment.save();
    return comment.likes;
  }

  async getLikes(commentId: string): Promise<number> {
    const comment = await this.commentModel.findById(commentId).exec();
    if (!comment) {
      throw new Error('Comment not found');
    }
    return comment.likes;
  }

  async create(createCommentDto: CommentsDto, challengeId: string): Promise<Comment> {
    const createdComment = new this.commentModel({ ...createCommentDto, challengeId }); // Include the challengeId in the comment data
    return createdComment.save();
  }


  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async findOne(id: string): Promise<Comment> {
    return this.commentModel.findById(id).exec();
  }

  async update(id: string, updateCommentDto: CommentsDto): Promise<Comment> {
    return this.commentModel.findByIdAndUpdate(id, updateCommentDto, { new: true });
  }

  async remove(id: string): Promise<Comment> {
    return this.commentModel.findByIdAndDelete(id);
  }


  async addReplyToComment(commentId: string, replyDto: CommentReplyDto): Promise<Comment> {
    const comment = await this.commentModel.findById(commentId);

    if (!comment) {
      throw new Error('Comment not found');
    }

    // Create a new reply
    const newReply = {
      senderName: replyDto.senderName,
      description: replyDto.description,
      date: new Date(),
    };

    // Add the reply to the comment's replies array
    comment.replies.push(newReply);

    // Save the updated comment
    await comment.save();

    // Return the updated comment
    return comment;
  }
  async showRepliesByComment(commentId: string): Promise<CommentReplyDto[]> {
    const comment = await this.commentModel.findById(commentId);
    
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    
    // Return the replies of the comment
    return comment.replies;
  }
  

}

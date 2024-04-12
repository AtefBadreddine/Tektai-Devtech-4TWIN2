import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from 'src/schemas/comments.schema';
import { CommentReplyDto, CommentsDto } from './comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':challengeId')
  async create(@Body() createCommentDto: CommentsDto, @Param('challengeId') challengeId: string): Promise<Comment> {
    return this.commentsService.create(createCommentDto, challengeId);
  }
  
  @Post(':commentId/increment-likes')
  async incrementLikes(@Param('commentId') commentId: string): Promise<number> {
    return this.commentsService.incrementLikes(commentId);
  }

  @Post(':commentId/decrement-likes')
  async decrementLikes(@Param('commentId') commentId: string): Promise<number> {
    return this.commentsService.decrementLikes(commentId);
  }


  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCommentDto: CommentsDto): Promise<Comment> {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.remove(id);
  }



  @Post(':commentId/replies')
  async addReplyToComment(
    @Param('commentId') commentId: string,
    @Body() replyDto: CommentReplyDto,
  ) {
    try {
      const updatedComment = await this.commentsService.addReplyToComment(commentId, replyDto);
      return { success: true, data: updatedComment };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  @Get(':id/replies')
  async showRepliesByComment(@Param('id') commentId: string): Promise<Comment[]> {
    try {
      const replies: CommentReplyDto[] = await this.commentsService.showRepliesByComment(commentId);
      
      // Transform CommentReplyDto[] to Comment[]
      const comments: Comment[] = replies.map(reply => ({
        userName: reply.senderName, // Assuming senderName represents userName
        challengeId: null, // You may need to fill this from somewhere
        description: reply.description,
        likes: 0, // You may need to adjust this according to your logic
        replies: [], // Assuming there are no replies to replies
        date: reply.date,
      }));

      return comments;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

}

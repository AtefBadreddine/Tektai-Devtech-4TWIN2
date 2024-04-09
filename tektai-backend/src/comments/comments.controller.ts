import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from 'src/schemas/comments.schema';
import { CommentsDto } from './comments.dto';

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
}

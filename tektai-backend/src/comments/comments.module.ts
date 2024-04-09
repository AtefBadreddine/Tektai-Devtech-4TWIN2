import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from 'src/schemas/comments.schema';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),UsersModule
  ],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}

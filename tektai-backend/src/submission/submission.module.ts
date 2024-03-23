// submission.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { Submission, SubmissionSchema } from 'src/schemas/submission.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Submission.name, schema: SubmissionSchema }]),
    MulterModule.register({
      dest: './uploads',
      limits: {
        fileSize: 1024 * 1024 * 5, // 5MB limit
      },
      fileFilter: (req, file, callback) => {
        if (file.mimetype === 'application/pdf') {
          callback(null, true);
        } else {
          callback(new Error('Only PDF files are allowed!'), false);
        }
      },
    }),
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService],
   exports: [SubmissionService],
})
export class SubmissionModule {}

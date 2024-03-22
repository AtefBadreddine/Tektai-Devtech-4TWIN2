// submission.controller.ts

import { Controller, Post, Get, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SubmissionService } from './submission.service';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('pdf', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
      },
    }),
  }))
  async uploadFile(
    @Body('teamId') teamId: string,
    @UploadedFile() pdf: Express.Multer.File,
    @Body('notebookFilePath') notebookFilePath: string,
  ) {
    const pdfFilePath = pdf.path;
    // Vous pouvez effectuer des opérations supplémentaires ici si nécessaire
    // Par exemple, valider le fichier, ou effectuer des opérations de traitement
    return this.submissionService.saveSubmission(teamId, pdfFilePath, notebookFilePath);
  }

}
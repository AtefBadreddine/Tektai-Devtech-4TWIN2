import { FileInterceptor } from '@nestjs/platform-express';

import { SubmissionService } from './submission.service';
import { Controller, Post, UploadedFiles, BadRequestException, UseInterceptors, Body } from '@nestjs/common';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post('submit')
  @UseInterceptors(
    FileInterceptor('pdf'),
    FileInterceptor('notebook'),
  )
  async uploadFiles(
    @UploadedFiles() files: { pdf?: Express.Multer.File, notebook?: Express.Multer.File },
    @Body() body: { TeamId: string }
  ) {
    try {
      console.log('Uploaded files:', files);
      console.log('Body:', body);

      if (!files || Object.keys(files).length === 0) {
        throw new BadRequestException('No files uploaded!');
      }

      const pdfData = files['pdf'] ? files['pdf'][0].buffer : null;
      const notebookData = files['notebook'] ? files['notebook'][0].buffer : null;
      const { TeamId } = body;

      return await this.submissionService.saveSubmission(TeamId, pdfData, notebookData);
    } catch (error) {
      throw error;
    }
  }
}

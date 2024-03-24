import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { SubmissionService } from './submission.service';
import { Controller, Post, UploadedFiles, BadRequestException, UseInterceptors, Logger } from '@nestjs/common';
import * as path from 'path';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  private readonly logger = new Logger();

  
  @Post('upload2')
@UseInterceptors(AnyFilesInterceptor())
async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
  try {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded!');
    }

    this.logger.log(`Files uploaded: ${files.map(file => file.originalname).join(', ')}`);

    if (!files[0] || !files[1]) {
      throw new BadRequestException('Both files are not uploaded!');
    }

    this.logger.log(`File 1: ${files[0].filename}, File 2: ${files[1].filename}`);

    const pdfPath = path.join(__dirname, '..', 'uploads', files[0].filename);
    const notebookPath = path.join(__dirname, '..', 'uploads', files[1].filename);

    this.logger.log(`PDF Path: ${pdfPath}`);
    this.logger.log(`Notebook Path: ${notebookPath}`);

    const TeamId = "1";

    // You may want to save the paths to your database here
    // For now, I'll assume you have a service method to save the paths
    await this.submissionService.saveSubmissionPaths(TeamId, pdfPath, notebookPath);

    return { message: 'Files uploaded successfully.' };
  } catch (error) {
    this.logger.error(error);
    throw error;
  }
}

}

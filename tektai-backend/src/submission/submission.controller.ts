import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { SubmissionService } from './submission.service';
import { Controller, Post, UploadedFiles, BadRequestException, UseInterceptors, Logger, Req } from '@nestjs/common';
import * as path from 'path';
import { Request, Response } from 'express'; // Import des types Request et Response depuis Express

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  private readonly logger = new Logger();

  @Post('upload2')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: Request // Utilisation de Req pour accéder à l'objet de la requête HTTP
  ) {
    try {
      const { teamId, challengeId } = req.body; // Extraire les valeurs de teamId et challengeId à partir du corps de la requête

      if (!files || files.length !== 2) {
        throw new BadRequestException('Two files are required!');
      }

      const pdfPath = path.join(__dirname, '..', 'uploads', files[0].filename);
      const notebookPath = path.join(__dirname, '..', 'uploads', files[1].filename);

      await this.submissionService.saveSubmission(teamId, challengeId, pdfPath, notebookPath);

      return { message: 'Files uploaded successfully.' };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

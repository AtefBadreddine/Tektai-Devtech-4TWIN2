import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { SubmissionService } from './submission.service';
import { Controller, Post, UploadedFiles, BadRequestException, UseInterceptors, Logger, Req } from '@nestjs/common';
import * as path from 'path';
import { Request } from 'express'; // Import des types Request et Response depuis Express
import { TeamsService } from 'src/teams/teams.service';
import { ChallengesService } from 'src/challenge/challenges.service';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService ,private readonly teamsService: TeamsService
    ,private readonly challengesService:ChallengesService ) {}

  private readonly logger = new Logger();
  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: Request,
  ) {
    try {
      const { teamId, challengeId } = req.body;

      // Vérifier si l'équipe et le défi existent
      const team = await this.teamsService.findOne(teamId);
      const challenge = await this.challengesService.findById(challengeId);

      if (!team || !challenge) {
        throw new BadRequestException('Team or challenge not found');
      }

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

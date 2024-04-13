import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { SubmissionService } from './submission.service';
import { Controller, Post, UploadedFiles, BadRequestException, UseInterceptors, Logger, Req, Put, Body, Delete, Get, Param } from '@nestjs/common';
import * as path from 'path';
import { Request } from 'express'; // Import des types Request et Response depuis Express
import { TeamsService } from 'src/teams/teams.service';
import { ChallengesService } from 'src/challenge/challenges.service';
import { Submission } from 'src/schemas/submission.schema';
import { Types } from 'mongoose';
import { ObjectId } from 'mongoose';
@Controller('submissions')
export class SubmissionController {
  constructor(
    private readonly submissionService: SubmissionService ,private readonly teamsService: TeamsService
    ,private readonly challengesService:ChallengesService ) {}

  private readonly logger = new Logger();

 @Post('submit')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: { teamId: ObjectId; challengeId: string },
  ) {
    try {
      const { teamId, challengeId } = body;
      this.logger.log('Received submission files:', files);
      this.logger.log('Received team and challenge IDs:', teamId, challengeId);
      // Vérifier si l'équipe et le défi existent
      const team = await this.teamsService.findOneById(teamId);
      const challenge = await this.challengesService.findById(challengeId);

      if (!team || !challenge) {
        throw new BadRequestException('Team or challenge not found');
      }

      if (!files || files.length !== 2) {
        throw new BadRequestException('Two files are required!');
      }

     const pdfPath = `uploads/${files[0].originalname}`;
    const notebookPath = `uploads/${files[1].originalname}`;

 this.logger.log('Receive files:', );
      // Enregistrer la soumission avec les IDs comme ObjectId
      await this.submissionService.saveSubmission(teamId, challengeId, pdfPath, notebookPath);

      return { message: 'Files uploaded successfully.' };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  @Get('submition/:id')
  async getSubmissionById(@Param('id') id: string): Promise<Submission> {
    try {
      return await this.submissionService.getSubmissionById(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Put('UpdateSubmition/:id')
  async updateSubmission(@Param('id') id: string, @Body() updateDto: Partial<Submission>): Promise<Submission> {
    try {
      return await this.submissionService.updateSubmission(id, updateDto);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Delete('DeleteSubmition/:id')
  async deleteSubmission(@Param('id') id: string): Promise<void> {
    try {
      await this.submissionService.deleteSubmission(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
     @Get('Allsubmition')
  async getAllSubmissions(): Promise<Submission[]> {
    try {
      return await this.submissionService.getAllSubmissions();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  
}

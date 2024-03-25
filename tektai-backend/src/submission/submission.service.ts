import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Submission, SubmissionDocument } from 'src/schemas/submission.schema';

@Injectable()
export class SubmissionService {
  private readonly logger = new Logger(SubmissionService.name);

  constructor(
    @InjectModel(Submission.name) private readonly submissionModel: Model<SubmissionDocument>,
  ) {}

  async saveSubmission(teamId: string, challengeId: string, pdf: string, notebook: string): Promise<Submission> {
    try {
      const createdSubmission = new this.submissionModel({ team: teamId, challenge: challengeId, pdf, notebook });
      const savedSubmission = await createdSubmission.save();
      this.logger.log(`Submission saved successfully: ${savedSubmission._id}`);
      this.logger.log(`Team ID: ${teamId}, Challenge ID: ${challengeId}`);

      return savedSubmission;
    } catch (error) {
      this.logger.error(`Error saving submission: ${error.message}`);
      throw error;
    }
  }

}

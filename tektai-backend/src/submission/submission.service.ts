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

  async saveSubmission(TeamId: string, pdf: Buffer, notebook: Buffer): Promise<Submission> {
    try {
      const createdSubmission = new this.submissionModel({ TeamId, pdf, notebook });
      const savedSubmission = await createdSubmission.save();

      this.logger.log(`Submission saved successfully: ${savedSubmission._id}`);

      return savedSubmission;
    } catch (error) {
      this.logger.error(`Error saving submission: ${error.message}`);
      throw error;
    }

  }
  async saveSubmissionPaths(teamId: string, pdfPath: string, notebookPath: string): Promise<void> {
    const submission = new this.submissionModel({
      TeamId: teamId,
      pdf: pdfPath,
      notebook: notebookPath,
    });
    await submission.save();
  }
}

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Submission, SubmissionDocument } from 'src/schemas/submission.schema';


@Injectable()
export class SubmissionService {
  constructor(
    @InjectModel(Submission.name) private readonly submissionModel: Model<SubmissionDocument>,
  ) {}

   async saveSubmission(teamId: string, pdfFilePath: string, notebookFilePath: string): Promise<Submission> {
    const createdSubmission = new this.submissionModel({ teamId, pdfFilePath, notebookFilePath });
    return createdSubmission.save();
  }
}

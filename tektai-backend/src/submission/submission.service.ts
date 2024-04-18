import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Submission, SubmissionDocument } from 'src/schemas/submission.schema';
import { ObjectId } from 'mongoose';
@Injectable()
export class SubmissionService {
  private readonly logger = new Logger(SubmissionService.name);

  constructor(
    @InjectModel(Submission.name) private readonly submissionModel: Model<SubmissionDocument>,
  ) {}

async saveSubmission(teamId: ObjectId, challengeId: string, pdf: string, notebook: string):Promise<Submission> {
    try {
      const createdSubmission = new this.submissionModel({ team: teamId, challenge: challengeId, pdf, notebook });
      const savedSubmission = await createdSubmission.save();
      this.logger.log(`Submission saved successfully: ${savedSubmission._id}`);
      this.logger.log(`Team ID: ${teamId}, Challenge ID: ${challengeId}`);
      this.logger.log('Received submission data:', teamId, challengeId, pdf, notebook);
      return savedSubmission;
    } catch (error) {
      this.logger.error(`Error saving submission: ${error.message}`);
      throw error;
    }
  }
  
  
  async getAllSubmissions(): Promise<Submission[]> {
  try {
    const submissions = await this.submissionModel.find().populate('team').populate('challenge').exec();
    console.log('All submissions:', submissions); // Ajouter ce journal de console pour vérifier les données de soumission
    return submissions;
  } catch (error) {
    this.logger.error(`Error getting all submissions: ${error.message}`);
    throw error;
  }
}

  async getSubmissionById(submissionId: string): Promise<Submission> {
    try {
      return await this.submissionModel.findById(submissionId).exec();
    } catch (error) {
      this.logger.error(`Error getting submission by ID: ${error.message}`);
      throw error;
    }
  }

  async updateSubmission(submissionId: string, updateDto: Partial<Submission>): Promise<Submission> {
    try {
      const updatedSubmission = await this.submissionModel.findByIdAndUpdate(submissionId, updateDto, { new: true }).exec();
      if (!updatedSubmission) {
        throw new Error('Submission not found');
      }
      return updatedSubmission;
    } catch (error) {
      this.logger.error(`Error updating submission: ${error.message}`);
      throw error;
    }
  }

  async deleteSubmission(submissionId: string): Promise<void> {
    try {
      const deletedSubmission = await this.submissionModel.findByIdAndDelete(submissionId).exec();
      if (!deletedSubmission) {
        throw new Error('Submission not found');
      }
    } catch (error) {
      this.logger.error(`Error deleting submission: ${error.message}`);
      throw error;
    }
  }


}

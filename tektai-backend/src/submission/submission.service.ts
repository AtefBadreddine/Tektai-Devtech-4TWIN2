import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
  async updateEvaluation(id: string, evaluation: number): Promise<Submission> {
    try {
      // Find the submission by ID and update the evaluation value
      const updatedSubmission = await this.submissionModel.findByIdAndUpdate(
        id,
        { evaluation },
        { new: true } // Return the updated document
      );
      return updatedSubmission;
    } catch (error) {
      throw error;
    }
  }
async saveSubmission(teamId: ObjectId, challengeId: string, pdf: string, notebook: string,presentation: string,
    excel: string,
    archive: string):Promise<Submission> {
    try {
      const createdSubmission = new this.submissionModel({ team: teamId, challenge: challengeId, 
        pdf,  
      notebook,
      presentation,
      excel,
      archive,
    
    
    });
      const savedSubmission = await createdSubmission.save();
      this.logger.log(`Submission saved successfully: ${savedSubmission._id}`);
      this.logger.log(`Team ID: ${teamId}, Challenge ID: ${challengeId}`);
      this.logger.log('Received submission data:', teamId, challengeId, pdf, notebook,presentation, excel, archive);
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
 async getSubmissionsByCompanyId(companyId: string): Promise<Submission[]> {
    try {
      const submissions = await this.submissionModel
        .find({ 'team.company_id': companyId }) // Filtrer les soumissions par l'ID de l'entreprise
        .populate('team') // Populer l'objet équipe pour obtenir les détails de l'entreprise
        .populate('challenge') // Populer l'objet défi pour obtenir les détails du défi
        .exec();
        this.logger.log("submissions",submissions);
      return submissions;

    } catch (error) {
      this.logger.error(`Error getting submissions by company ID: ${error.message}`);
      throw error;
    }
  }

  // Méthode pour récupérer les soumissions pour les défis appartenant à l'entreprise de l'utilisateur connecté
  async getSubmissionsForChallengesOwnedByCompany(companyId: string): Promise<Submission[]> {
    try {
      // Rechercher les soumissions où l'ID de l'entreprise du défi correspond à l'ID de l'entreprise de l'utilisateur connecté
      const submissions = await this.submissionModel.find({ 'challenge.company_id': companyId }).exec();
      return submissions;
    } catch (error) {
      throw new NotFoundException('Failed to fetch submissions for challenges owned by the company.');
    }
  }

  

}


import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Challenges, ChallengesDocument } from 'src/schemas/challenges.schema';
import { ChallengeDto } from './challeges.dto';
import { User, UserDocument } from 'src/schemas/user.schema'; // Import User and UserDocument from the user schema
import { extname } from 'path';


@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel(Challenges.name) private readonly challengesModel: Model<ChallengesDocument>,  
  ) {}

  async findAll(): Promise<Challenges[]> {
    return this.challengesModel.find().exec();
  }

  async findById(id: string): Promise<Challenges> {
    return this.challengesModel.findById(id).exec();
  }

  async create(challengeDto: ChallengeDto): Promise<Challenges> {
    const createdChallenge = new this.challengesModel(challengeDto);
    return createdChallenge.save();
  }

  async updateChallenge(_id: string, challengeDto: ChallengeDto): Promise<Challenges> {
    return this.challengesModel.findByIdAndUpdate(_id, challengeDto, { new: true });
  }

  async update(id: string, challengeDto: ChallengeDto): Promise<Challenges> {
    return this.challengesModel.findByIdAndUpdate(id, challengeDto, { new: true });
  }

  async delete(id: string): Promise<void> {
    await this.challengesModel.findByIdAndDelete(id);
  }
  async getFilteredChallenges(status: string, startDate: Date, deadline: Date): Promise<Challenges[]> {
    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (startDate) {
      query.start_date = { $gte: startDate };
    }

    if (deadline) {
      query.deadline = { $lte: deadline };
    }

    return this.challengesModel.find(query).exec();
  }

  async findByTitle(title: string): Promise<Challenges[]> {

    const regex = new RegExp(title, 'i'); // Case-insensitive search
    return this.challengesModel.find({ title: { $regex: regex } }).exec();
  }
  async getChallengesByCompanyId(company_id: string): Promise<Challenges[]> {
    const regex = new RegExp(company_id, 'i'); // Case-insensitive search
    return this.challengesModel.find({ company_id: { $regex: regex } }).exec();
  }
  
  async uploadDatasetToChallenge(challengeId: string, challengeDto: ChallengeDto, file: Express.Multer.File): Promise<Challenges> {
    try {
        const existingChallenge = await this.challengesModel.findById(challengeId).exec();
        if (!existingChallenge) {
            throw new NotFoundException('Challenge not found');
        }

        existingChallenge.dataset = challengeDto.dataset || existingChallenge.dataset;
        if (file) {
            const fileExt = extname(file.originalname);
            const uniqueSuffix = `${challengeId}`; // Generate unique filename with challenge ID
            const randomFileName = `${uniqueSuffix}${fileExt}`;

            existingChallenge.dataset = randomFileName;
        }
        const updatedChallenge = await existingChallenge.save();
        return updatedChallenge;
    } catch (error) {
        throw new InternalServerErrorException('Failed to upload dataset');
    }
}

  // Add a new method to get the dataset by challenge ID
  async getDatasetByChallengeId(challengeId: string): Promise<string> {
    const challenge = await this.findById(challengeId);
    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }
    return challenge.dataset;
  }
  async findByIdo(id: string): Promise<ChallengesDocument> {
    const challenge = await this.challengesModel.findById(id).exec();
    if (!challenge) {
      throw new NotFoundException(`Challenge with ID ${id} not found`);
    }
    return challenge;
  }

  

}
import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import { TeamDto } from './dto/team.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from '../schemas/team.schema';

@Injectable()
export class TeamsService {
  private readonly logger = new Logger();
  constructor(@InjectModel(Team.name) private teamModel: Model<TeamDocument>) {}

  async create(createTeamDto: TeamDto): Promise<Team> {
    const createdTeam = new this.teamModel(createTeamDto);
    return createdTeam.save();
  }

  async findAll(): Promise<Team[]> {
    return this.teamModel.find().populate('leader members').exec();
  }

  async findOne(id: string): Promise<Team> {
    const team = await this.teamModel.findById(id).exec();

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async update(id: string, updateTeamDto: TeamDto): Promise<Team> {
    const existingTeam = await this.teamModel.findByIdAndUpdate(id, updateTeamDto, { new: true }).exec();
    if (!existingTeam) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return existingTeam;
  }

  async remove(id: string): Promise<Team> {

   return this.teamModel.findByIdAndDelete(id);

  }
}

import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import { TeamDto } from './dto/team.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from '../schemas/team.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TeamsService {
  private readonly logger = new Logger();
  constructor(@InjectModel(Team.name) private teamModel: Model<TeamDocument>,
  private readonly userService: UsersService,) {}

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
  async addMember(teamId: string, memberId: string): Promise<Team> {
    const team = await this.findOne(teamId);
    const member = await this.userService.findById(memberId); // Use the UserService to find the member
    if (!member) {
      throw new NotFoundException(`User with ID ${memberId} not found`);
    }
    team.members.push(member);
    return this.teamModel.findByIdAndUpdate(teamId, team, { new: true }).exec();
}

async removeMember(teamId: string, memberId: string): Promise<Team> {
    const team = await this.findOne(teamId);
    const memberIndex = team.members.findIndex(member => member._id == memberId);
    if (memberIndex === -1) {
      throw new NotFoundException(`Member with ID ${memberId} not found in team with ID ${teamId}`);
    }
    team.members.splice(memberIndex, 1);
    return this.teamModel.findByIdAndUpdate(teamId, team, { new: true }).exec();
}

}

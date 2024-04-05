// teams.service.ts

import {Inject, Injectable, Logger, NotFoundException} from '@nestjs/common';
import { TeamDto } from './dto/team.dto';
import { InjectModel } from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import { Team, TeamDocument } from '../schemas/team.schema';

import { Invitation, InvitationDocument } from '../schemas/invitation.schema';
import {UsersService} from "../users/users.service";


@Injectable()
export class TeamsService {
  private readonly logger = new Logger();

  constructor(
      @Inject(UsersService) private readonly userService: UsersService,
      @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
      @InjectModel(Invitation.name) private invitationModel: Model<InvitationDocument>,
  ) {}


  async create(createTeamDto: TeamDto): Promise<TeamDocument> {
    const { name, leader } = createTeamDto;

    const createdTeam = new this.teamModel({ name, leader });
    const savedTeam = await createdTeam.save();

    const members = createTeamDto.members;

    for (const memberID of members) {
      try {

        await this.sendInvitation( memberID, savedTeam._id);
      } catch (error) {
        console.error(`Failed to send invitation to member with ID ${memberID}: ${error.message}`);
      }
    }

    return savedTeam;
  }


  async findAll(): Promise<TeamDocument[]> {
    return this.teamModel.find().populate('leader members').exec();
  }
  async findAllWithLeader(): Promise<TeamDocument[]> {
    try {
      return await this.teamModel.find()
        .populate('leader')
        .populate('members')
        .exec();
    } catch (error) {
      throw new Error(`Failed to fetch teams with leaders and members: ${error.message}`);
    }
  }
  

  async findOne(id: string): Promise<TeamDocument> {
    const team = await this.teamModel.findById(id).populate('leader members').exec();

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async findTeamsByUserId(userId: string): Promise<TeamDocument[]> {

    return  this.teamModel.find({
      $or: [
        { leader: userId },
        { members: userId }
      ]
    }).populate('leader members').exec();

  }

  async updateTeamName(id: string, newName: string): Promise<TeamDocument> {
    const updatedTeam = await this.teamModel.findByIdAndUpdate(id, { name: newName }, { new: true }).exec();
    if (!updatedTeam) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return updatedTeam;
  }


  async changeTeamLeader(teamId: string, newLeaderId: string): Promise<TeamDocument> {
    const team = await this.teamModel.findById(teamId).exec();
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }

    const newLeader = await this.userService.findById(newLeaderId);
    if (!team.members.includes(newLeader))
      throw new NotFoundException(`Member with ID ${newLeaderId} not found`);

    team.members = team.members.filter(memberId => memberId._id !== team.leader._id);
    team.members.push(newLeader);

    team.leader = newLeader;

    return team.save();
  }

  async removeMember(teamId: string, memberId: string): Promise<TeamDocument> {
    const team = await this.teamModel.findById(teamId).exec();
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }
  
    // Convert memberId to ObjectId for comparison
    const memberIdObj = new Types.ObjectId(memberId);
  
    // Filter out the member with the specified ID
    team.members = team.members.filter(member => member._id.toString() !== memberIdObj.toString());
  
    return team.save();
  }

  async removeTeam(id: string) {
    const team = await this.teamModel.findById(id).exec();
    if (!team)
      throw new NotFoundException(`Team with ID ${id} not found`);
    await this.invitationModel.deleteMany({ team: team._id }).exec();
    await this.teamModel.deleteOne(team._id);

    return team;
  }


 
  async addMember(teamId: string, memberId: string): Promise<TeamDocument> {
    const team = await this.findOne(teamId);
    const member = await this.userService.findById(memberId); // Use the UserService to find the member
    if (!member) {
      throw new NotFoundException(`User with ID ${memberId} not found`);
    }
    team.members.push(member);
    return this.teamModel.findByIdAndUpdate(teamId, team, { new: true }).exec();
}

// async removeMember(teamId: string, memberId: string): Promise<Team> {
//     const team = await this.findOne(teamId);
//     const memberIndex = team.members.findIndex(member => member._id == memberId);
//     if (memberIndex === -1) {
//       throw new NotFoundException(`Member with ID ${memberId} not found in team with ID ${teamId}`);
//     }
//     team.members.splice(memberIndex, 1);
//     return this.teamModel.findByIdAndUpdate(teamId, team, { new: true }).exec();
// }
async update(id: string, updateTeamDto: TeamDto): Promise<TeamDocument> {
  const existingTeam = await this.teamModel.findByIdAndUpdate(id, updateTeamDto, { new: true }).exec();
  if (!existingTeam) {
    throw new NotFoundException(`Team with ID ${id} not found`);
  }
  return existingTeam;
}

async remove(id: string): Promise<TeamDocument> {

  return this.teamModel.findByIdAndDelete(id);

  }
  
  async findAllInvitations(): Promise<InvitationDocument[]> {
    return this.invitationModel
      .find()
      .populate({
        path: 'team',
        populate: { path: 'leader' },
      })
      .exec();
  }
  
    async findInvitationByUser(userId: string): Promise<InvitationDocument[]> {
      return this.invitationModel
        .find({ recipient: userId })
        .populate({
          path: 'team',
          populate: { path: 'leader' },
        })
        .exec();
    }

   async findInvitation(id: string): Promise<InvitationDocument> {
    const invitation = await this.invitationModel.findById(id).exec();

    if (!invitation) {
      throw new NotFoundException(`Invitation with ID ${id} not found`);
    }
    return invitation;
  }
  async sendInvitation(recipientId: string, teamId: string): Promise<InvitationDocument> {
    const recipient = await this.userService.findById(recipientId);
    const team = await this.teamModel.findById(teamId);
    if (!recipient || !team ) {
      throw new NotFoundException(`member or team not found`);


    }
    const invitation = new this.invitationModel({  recipient: recipient, team: team });
    return invitation.save();
  }

  async acceptInvitation(invitationId: string): Promise<TeamDocument> {
    const invitation = await this.invitationModel.findById(invitationId).exec();
    if (!invitation) {
      throw new NotFoundException(`Invitation with ID ${invitationId} not found`);
    }
    const team = await this.teamModel.findById(invitation.team).exec();
    const newMember = invitation.recipient;
    if (team.members.includes(newMember)) {
      throw new Error(`User with ID ${newMember} is already a member of the team`);
    }
    team.members.push(newMember);
    invitation.accepted=true;
    invitation.save();
    return team.save();
  }


  async declineInvitation(invitationId: string): Promise<InvitationDocument> {
    return this.invitationModel.findByIdAndDelete(invitationId);


// async removeMember(teamId: string, memberId: string): Promise<Team> {
//     const team = await this.findOne(teamId);
//     const memberIndex = team.members.findIndex(member => member._id == memberId);
//     if (memberIndex === -1) {
//       throw new NotFoundException(`Member with ID ${memberId} not found in team with ID ${teamId}`);
//     }
//     team.members.splice(memberIndex, 1);
//     return this.teamModel.findByIdAndUpdate(teamId, team, { new: true }).exec();
// }
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

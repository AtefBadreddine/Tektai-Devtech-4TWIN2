
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  ConflictException,
  Put, Logger, NotFoundException, ForbiddenException
} from '@nestjs/common';


import { TeamsService } from './teams.service';
import { TeamDto } from './dto/team.dto';
import { Request } from 'express';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import axios from "axios";

@Controller('teams')
export class TeamsController {
  private readonly logger = new Logger();

  constructor(private readonly teamsService: TeamsService) {}

  @Get('invitations')
  async getAll() {
      return this.teamsService.findAllInvitations();
  }
  // @UseGuards(JwtAuthGuard)

  @Get()
  async findAll() {
    return this.teamsService.findAllWithLeader();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }
  @Get('invitationsbyteam/:id')
  async getByIdtea(@Param('id') teamId: string) {
      return this.teamsService.findInvitationsByTeamId(teamId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/user/joined')
  async findTeamsByUser(@Req() req: Request) {
    try {

      // @ts-ignore
      return this.teamsService.findTeamsByUserId(req.user._id);

    } catch (error) {

      console.error(error);
      throw new ConflictException('Failed to retrieve user teams');
    }
  }
  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: Request, @Body() createTeamDto: TeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: TeamDto) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id/update-name')
  async updateTeamName(@Req() req: Request, @Param('id') id: string, @Body('name') newName: string) {

    const team = await this.teamsService.findOne(id);
    /*const userId = req.user['_id'];
    if (! team.leader._id.equals(userId)) {
      throw new ConflictException(`Current user is not authorized to update the team name`);
    }*/
    return this.teamsService.updateTeamName(id, newName);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/change-leader')
  async changeTeamLeader(@Req() req: Request, @Param('id') id: string, @Body('newLeaderId') newLeaderId: string) {

    const team = await this.teamsService.findOne(id);
    /*const userId = req.user['_id'];
    if (! team.leader._id.equals(userId)) {
      throw new ConflictException(`Current user is not authorized to change the team leader`);
    }*/
    return this.teamsService.changeTeamLeader(id, newLeaderId);
  }

  // @UseGuards(JwtAuthGuard)
  // @Patch(':id/remove-member/:memberId')
  // async removeMember(@Req() req: Request, @Param('id') id: string, @Param('memberId') memberId: string) {
  //   const team = await this.teamsService.findOne(id);
  //   const userId = req.user['_id'];
  //   if (! team.leader._id.equals(userId)) {
  //     throw new ConflictException(`Current user is not authorized to remove members from the team`);
  //   }
  //   return this.teamsService.removeMember(id, memberId);
  // }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeTeam(@Req() req: Request, @Param('id') id: string) {

    const team = await this.teamsService.findOne(id);
   /* const userId = req.user['_id'];
    if (! team.leader._id.equals(userId)) {
      throw new ConflictException(`Current user is not authorized to delete the team`);
    }*/
    return this.teamsService.removeTeam(id);
  }



  // @UseGuards(JwtAuthGuard)
  @Post(':teamId/members/:memberId')
  async addMember(@Param('teamId') teamId: string, @Param('memberId') memberId: string) {
    try {
      const team = await this.teamsService.addMember(teamId, memberId);
      return { success: true, message: 'Member added successfully', team };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }


  //@UseGuards(JwtAuthGuard)
  @Delete(':teamId/members/:memberId')
  async removeMember(@Param('teamId') teamId: string, @Param('memberId') memberId: string) {
    try {
      const team = await this.teamsService.removeMember(teamId, memberId);
      return { success: true, message: 'Member removed successfully', team };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

    

    @Get('invitations/user/:userId')
    async getByUser(@Param('userId') userId: string) {
        return this.teamsService.findInvitationByUser(userId);
    }

    @Get('invitations/:id')
    async getById(@Param('id') id: string) {
        return this.teamsService.findInvitation(id);
  }


  @Post('invitations/:teamId/send')
  async sendInvitation(@Req() req: Request, @Param('teamId') teamId: string,@Body('memberId') memberId: string) {
    // to do make it unique on table invitation
    this.logger.log('controller', memberId);
      this.logger.log('controller', teamId);
    const team = await this.teamsService.findOne(teamId);
    // const userId = req.user['_id'];
    if (! team.leader) {
      throw new ConflictException(`Current user is not authorized to send invitation`);
    }
     return this.teamsService.sendInvitation(memberId,teamId);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('invitations/:invitationId/accept')
  async acceptInvitation(@Req() req: Request, @Param('invitationId') invitationId: string) {
    const invitation = await this.teamsService.findInvitation(invitationId);
    invitation.accepted = true; // Set accepted to true
    
    // const userId = req.user && req.user['_id'];
    // if (!invitation.recipient._id.equals(userId)) {
    //   throw new ConflictException(`Current user is not authorized to accept this invitation`);
    // }
    
    return this.teamsService.acceptInvitation(invitationId);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('invitations/:invitationId/remove/:userId')
  async removeInvitation(
    @Param('invitationId') invitationId: string,
    @Param('userId') userId: string
  ) {
    const invitation = await this.teamsService.findInvitation(invitationId);
    // Check if the invitation exists
    // if (!invitation) {
    //   throw new NotFoundException(`Invitation with ID ${invitationId} not found`);
    // }
  
   
    // Remove the member from the team
    const updatedTeam = await this.teamsService.declineInvitation(invitation._id);
  
    // Return the updated team
    return updatedTeam;
  }
  
  
}

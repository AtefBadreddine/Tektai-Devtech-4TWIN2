import {Controller, Get, Post, Body, Param, Delete, Put, NotFoundException} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamDto } from './dto/team.dto';


@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: TeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  async findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: TeamDto) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
  @Post(':teamId/members/:memberId')
  async addMember(@Param('teamId') teamId: string, @Param('memberId') memberId: string) {
    try {
      const team = await this.teamsService.addMember(teamId, memberId);
      return { success: true, message: 'Member added successfully', team };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':teamId/members/:memberId')
  async removeMember(@Param('teamId') teamId: string, @Param('memberId') memberId: string) {
    try {
      const team = await this.teamsService.removeMember(teamId, memberId);
      return { success: true, message: 'Member removed successfully', team };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}

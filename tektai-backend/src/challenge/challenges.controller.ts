// challenges.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { Challenges } from 'src/schemas/challenges.schema';
import { ChallengeDto } from './challeges.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';


@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  async findAll(): Promise<Challenges[]> {
    return this.challengesService.findAll();
  }


  @Get('search')
  findByTitle(@Query('title') title: string): Promise<Challenges[]> {
    return this.challengesService.findByTitle(title);
  }

  @Get('filter')
  async getFilteredChallenges(
    @Query('status') status: string,
    @Query('startDate') startDate: string,
    @Query('deadline') deadline: string,
  ): Promise<Challenges[]> {
    // Parse startDate and deadline to Date objects if needed
    const startDateFilter = startDate ? new Date(startDate) : null;
    const deadlineFilter = deadline ? new Date(deadline) : null;

    // Fetch filtered challenges from the service
    return this.challengesService.getFilteredChallenges(status, startDateFilter, deadlineFilter);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Challenges> {
    return this.challengesService.findById(id);
  }

  @Post()
  async create(@Body() challengeDto: ChallengeDto): Promise<Challenges> {
    return this.challengesService.create(challengeDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() challengeDto: ChallengeDto): Promise<Challenges> {
    return this.challengesService.update(id, challengeDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.challengesService.delete(id);
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadChallengeImage(@UploadedFile() file) {
    try {
      if (!file) {
        return { message: 'No file uploaded' };
      }

      // Save the file to a specific location
      const path = `uploads/${file.originalname}`;
      fs.writeFileSync(path, file.buffer);

      // Perform additional processing if needed, such as saving the file path to a database or storage
      // For example:
      // const imageUrl = `http://localhost:3000/${path}`;
      // Save the imageUrl to your database
      
      return { message: 'File uploaded successfully', file };
    } catch (error) {
      console.error('Error uploading file:', error);
      return { error: 'Failed to upload file' };
    }
  }


}

// challenges.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile, Query, UseGuards, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { Challenges } from 'src/schemas/challenges.schema';
import { ChallengeDto } from './challeges.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as nodePath from 'path'; // Import the path module from Node.js

import { Response } from 'express';



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

  // @Get('company/:companyId')
  // @UseGuards(JwtAuthGuard) 
  // async getChallengesByCompanyId(@Param('companyId') companyId: string): Promise<Challenges[]> {
  //   return this.challengesService.getChallengesByCompanyId(companyId);
  // }


  @Get(':id')
  async findById(@Param('id') id: string): Promise<Challenges> {
    return this.challengesService.findById(id);
  }


  @Get('company/:companyId')
  @UseGuards(JwtAuthGuard) 
  async getChallengesByCompanyId(@Param('companyId') companyId: string): Promise<Challenges[]> {
    return this.challengesService.getChallengesByCompanyId(companyId);
  }

  @Get('count/:userId')
  async getChallengeCountByUser(@Param('userId') userId: string): Promise<number> {
    return this.challengesService.getChallengeCountByUser(userId);
  }


  @Get('completed/:userId')
  async getCompletedChallengeCountByUser(@Param('userId') userId: string): Promise<number> {
    return this.challengesService.getCompletedChallengeCountByUser(userId);
  }
  @Get('upcoming/:userId')
  async getupcomingChallengeCountByUser(@Param('userId') userId: string): Promise<number> {
    return this.challengesService.getupcomingChallengeCountByUser(userId);
  }

  @Get('ongoing/:userId')
  async getongoingChallengeCountByUser(@Param('userId') userId: string): Promise<number> {
    return this.challengesService.getongoingChallengeCountByUser(userId);
  }


  // @UseGuards(JwtAuthGuard) 
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



/* 
  @Post('/upload/:challengeId')
  @UseInterceptors(FileInterceptor('dataset')) // Use FileInterceptor for handling file uploads
  async uploadDatasetToChallenge(
      @Param('challengeId') challengeId: string,
      @Body() challengeDto: ChallengeDto,
      @UploadedFile() file: Express.Multer.File,
  ) {
      return await this.challengesService.uploadDatasetToChallenge(challengeId, challengeDto, file);
  }
   */


    //@UseGuards(JwtAuthGuard)
    @Post('/uploadfile/:challengeId')
    @UseInterceptors(FileInterceptor('dataset')) // Use FileInterceptor for handling image uploads
    async uploadDatasetToChallenge(
      @Param('challengeId') challengeId: string,
        @Body() challengeDto: ChallengeDto,
        @UploadedFile() dataset: Express.Multer.File,
        ) {
        return await this.challengesService.uploadfile(challengeId, challengeDto, dataset);
    }
    
   //@UseGuards(JwtAuthGuard)
    @Post('/uploadimage/:challengeId')
    @UseInterceptors(FileInterceptor('image')) // Use FileInterceptor for handling image uploads
    async uploadImageToChallenge(
      @Param('challengeId') challengeId: string,
        @Body() challengeDto: ChallengeDto,
        @UploadedFile() image: Express.Multer.File,
        ) {
        return await this.challengesService.uploadImage(challengeId, challengeDto,image);
    }


 

/*     @Post('uploadimage')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@UploadedFile() image: Express.Multer.File, @Body() challengeDto: ChallengeDto) {
        try {
            const createdChallenge = await this.challengesService.uploadImage(challengeDto, image);
            return { success: true, data: createdChallenge };
        } catch (error) {
            return { success: false, message: 'Failed to upload image for new challenge' };
        }
    }
     */

    @Get('/datasetdownload/:challengeId')
    async downloadFile(@Param('challengeId') challengeId: string, @Res() res: Response) {
      try {
        const filePath = await this.challengesService.downloadFile(challengeId);
        // Assuming filePath is the URL to the file
        res.download(filePath); // Serve the file for download
      } catch (error) {
        // Handle errors
        res.status(500).send('Failed to download file');
      }
    }

  
/*   @Get('download/dataset/:challengeId')
  async downloadDataset(@Param('challengeId') challengeId: string, @Res() res: Response) {
    try {
      // Get the dataset from the service
      const dataset = await this.challengesService.getDatasetByChallengeId(challengeId);

      // Set response headers
      res.setHeader('Content-Disposition', `attachment; filename="dataset_${challengeId}.txt"`);
      res.setHeader('Content-Type', 'text/plain');

      // Send the dataset as the response
      res.send(dataset);
    } catch (error) {
      // Handle errors
      if (error instanceof NotFoundException) {
        return res.status(404).send(error.message);
      }
      console.error('Error downloading dataset:', error);
      res.status(500).send('Failed to download dataset');
    }
  } 
  

} */

  /*@Post('upload')
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
  }}*/

}
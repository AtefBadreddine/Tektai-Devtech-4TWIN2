import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { LocalisationService } from './localisation.service';
import { Localisation } from 'src/schemas/localisation.schema';

@Controller('localisations')

export class LocalisationController {
  constructor(private readonly localisationService: LocalisationService) {}

  @Post('addlocalisation')
  async createLocalisation(@Body() localisationData): Promise<Localisation> {
    return this.localisationService.createLocalisation(localisationData);
  }

  @Get('getlocalisation')
  async findAllLocalisations(): Promise<Localisation[]> {
    return this.localisationService.findAllLocalisations();
  }

  @Get('getlocalisation/:id')
  async findLocalisationById(@Param('id') localisationId: string): Promise<Localisation> {
    const localisation = await this.localisationService.findLocalisationById(localisationId);
    if (!localisation) {
      throw new NotFoundException('Localisation not found');
    }
    return localisation;
  }

  @Put('updatelocalisation/:id')
  async updateLocalisation(@Param('id') localisationId: string, @Body() updateData): Promise<Localisation> {
    const updatedLocalisation = await this.localisationService.updateLocalisation(localisationId, updateData);
    if (!updatedLocalisation) {
      throw new NotFoundException('Localisation not found');
    }
    return updatedLocalisation;
  }

  @Delete('deletelocalisation/:id')
  async deleteLocalisation(@Param('id') localisationId: string): Promise<Localisation> {
    const deletedLocalisation = await this.localisationService.deleteLocalisation(localisationId);
    if (!deletedLocalisation) {
      throw new NotFoundException('Localisation not found');
    }
    return deletedLocalisation;
  }

  // Utilisez le middleware CORS pour activer les en-têtes CORS
  @Get('getlocalisation')
  
  async findAllLocalisationsWithCors(): Promise<Localisation[]> {
    return this.localisationService.findAllLocalisations();
  }
}

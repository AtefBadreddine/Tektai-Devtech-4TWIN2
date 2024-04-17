// localisation.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Localisation, LocalisationDocument } from 'src/schemas/localisation.schema'; // Importez LocalisationDocument depuis localisation.schema.ts


@Injectable()
export class LocalisationService {
  constructor(
    @InjectModel(Localisation.name) private localisationModel: Model<LocalisationDocument>,
  ) {}

  async createLocalisation(localisationData): Promise<Localisation> {
    const createdLocalisation = new this.localisationModel(localisationData);
    return createdLocalisation.save();
  }



  async findLocalisationById(localisationId: string): Promise<Localisation> {
    return this.localisationModel.findById(localisationId).exec();
  }

  async updateLocalisation(localisationId: string, updateData): Promise<Localisation> {
    return this.localisationModel.findByIdAndUpdate(localisationId, updateData, { new: true }).exec();
  }

  async deleteLocalisation(localisationId: string): Promise<Localisation> {
    return this.localisationModel.findByIdAndDelete(localisationId).exec();
  }
  async findAllLocalisations(): Promise<Localisation[]> {
    return this.localisationModel.find().exec();
  }

 
}

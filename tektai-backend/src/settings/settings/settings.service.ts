import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings, SettingsDocument } from 'src/schemas/settings.schema';
import { SettingsDto } from './settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel('Settings') private readonly settingsModel: Model<SettingsDocument>,
  ) {}



  async create(settingsDto : SettingsDto): Promise<Settings> {
    const settings = new this.settingsModel(settingsDto);
    return settings.save();
  }



  async findAll(): Promise<Settings[]> {
    return this.settingsModel.find().exec();
  }

  async findOne(id: string): Promise<Settings | null> {
    return this.settingsModel.findById(id).exec();
  }

  async update(id: string, updateSettingsDto: SettingsDto): Promise<Settings | null> {
    return this.settingsModel.findByIdAndUpdate(id, updateSettingsDto, { new: true }).exec();
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.settingsModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}

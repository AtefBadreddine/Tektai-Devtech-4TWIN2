import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { SettingsSchema } from 'src/schemas/settings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Settings', schema: SettingsSchema }]),
  ],
  providers: [SettingsService],
  controllers: [SettingsController],
})
export class SettingsModule {}

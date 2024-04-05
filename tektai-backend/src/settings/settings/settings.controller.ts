import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsDto } from './settings.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  create(@Body() createSettingsDto: SettingsDto) {
    return this.settingsService.create(createSettingsDto);
  }

  @Get()
  findAll() {
    return this.settingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.settingsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSettingsDto: SettingsDto) {
    return this.settingsService.update(id, updateSettingsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.settingsService.remove(id);
  }
}

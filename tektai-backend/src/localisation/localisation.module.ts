import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocalisationController } from './localisation.controller';
import { LocalisationService } from './localisation.service';
import { Localisation, LocalisationSchema } from 'src/schemas/localisation.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Localisation.name, schema: LocalisationSchema }])],
  controllers: [LocalisationController],
  providers: [LocalisationService],
    exports: [LocalisationService],
})
export class LocalisationModule {}

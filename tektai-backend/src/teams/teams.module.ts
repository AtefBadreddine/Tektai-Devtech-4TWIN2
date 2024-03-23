import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Team, TeamSchema} from "../schemas/team.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name : Team.name , schema : TeamSchema}])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}

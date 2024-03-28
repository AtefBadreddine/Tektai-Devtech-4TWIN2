import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Team, TeamSchema} from "../schemas/team.schema";
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name : Team.name , schema : TeamSchema}])
  ,
  UsersModule,],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}

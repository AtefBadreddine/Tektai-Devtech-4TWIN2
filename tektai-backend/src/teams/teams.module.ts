import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Team, TeamSchema} from "../schemas/team.schema";
import {Invitation, InvitationSchema} from "../schemas/invitation.schema";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [
      UsersModule,
      MongooseModule.forFeature([{ name : Team.name , schema : TeamSchema}]),
      MongooseModule.forFeature([{ name : Invitation.name , schema : InvitationSchema}]),
  ],

  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}

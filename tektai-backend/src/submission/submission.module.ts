import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { Submission, SubmissionSchema } from 'src/schemas/submission.schema';
import { TeamsService } from 'src/teams/teams.service';
import { Team, TeamSchema } from 'src/schemas/team.schema';
// Import de ChallengesService
import { Challenges, ChallengesSchema } from 'src/schemas/challenges.schema'; // Import de ChallengesModel
import { ChallengesService } from 'src/challenge/challenges.service';

@Module({
  imports: [
   MongooseModule.forFeature([
      { name: Submission.name, schema: SubmissionSchema },
      { name: Team.name, schema: TeamSchema },
      { name: Challenges.name, schema: ChallengesSchema }, // Ajouter ChallengesModel au MongooseModule
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService, TeamsService, ChallengesService],
  exports: [SubmissionService],
})
export class SubmissionModule {}

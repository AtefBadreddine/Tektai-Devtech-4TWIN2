import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { Submission, SubmissionSchema } from 'src/schemas/submission.schema';
import { TeamsService } from 'src/teams/teams.service';
import { Team, TeamSchema } from 'src/schemas/team.schema';
import { Challenges, ChallengesSchema } from 'src/schemas/challenges.schema'; 
import { ChallengesService } from 'src/challenge/challenges.service';
import { Invitation, InvitationSchema } from 'src/schemas/invitation.schema';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/schemas/user.schema';
import * as multer from 'multer';


@Module({
  imports: [
   MongooseModule.forFeature([
      { name: Submission.name, schema: SubmissionSchema },
      { name: Team.name, schema: TeamSchema },
      { name: Challenges.name, schema: ChallengesSchema },
      { name: Invitation.name, schema: InvitationSchema },
      { name: User.name, schema: UserSchema }, // Assurez-vous d'inclure InvitationModel ici
    ]),
    MulterModule.register({
      dest: './uploads',
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads');
        },
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  ],
   
  
  controllers: [SubmissionController],
  providers: [SubmissionService, TeamsService, ChallengesService,UsersService], // Retirez Invitation des fournisseurs car il n'est pas nécessaire ici
  exports: [SubmissionService],
})
export class SubmissionModule {}

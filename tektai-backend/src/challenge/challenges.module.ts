import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { Challenges, ChallengesSchema } from 'src/schemas/challenges.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengesController } from './challenges.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Challenges.name, schema: ChallengesSchema }])
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}

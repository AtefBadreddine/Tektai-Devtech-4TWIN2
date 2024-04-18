import { Module, forwardRef } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { Challenges, ChallengesSchema } from 'src/schemas/challenges.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengesController } from './challenges.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Challenges.name, schema: ChallengesSchema }]),
    forwardRef(() => UsersModule), // Use forwardRef() to handle circular dependency
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService],
  exports: [ChallengesService, MongooseModule],

})
export class ChallengesModule {}

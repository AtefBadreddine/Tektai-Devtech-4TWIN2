import { Module } from '@nestjs/common';
import { HistorychallengesController } from './historychallenges.controller';

@Module({
  controllers: [HistorychallengesController]
})
export class HistorychallengesModule {}

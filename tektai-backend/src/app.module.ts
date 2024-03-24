import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import * as process from 'process';
import { SettingsModule } from './settings/settings/settings.module';
import { TermModule } from './termOfUse/term.module';
import { ChallengesModule } from './challenge/challenges.module';
import { MulterConfigModule } from './multer.module';
import { HistorychallengesModule } from './historychallenges/historychallenges.module';
import { HistorychallengesService } from './historychallenges/historychallenges.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    AuthModule,
    UsersModule,
    SettingsModule,
    TermModule,
    ChallengesModule,
    MulterConfigModule,
    HistorychallengesModule
    ],
  controllers: [AppController],
  providers: [AppService,HistorychallengesService],
})
export class AppModule {}

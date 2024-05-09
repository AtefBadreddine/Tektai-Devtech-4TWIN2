import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { AuthModule } from './auth/auth.module';
 // Importez UsersModule
import { TeamsModule } from './teams/teams.module';
import { ContactModule } from './contact/contact.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChallengesModule } from './challenge/challenges.module';
import { SettingsModule } from './settings/settings/settings.module';
import { TermModule } from './termOfUse/term.module';
import { CommentsModule } from './comments/comments.module';
import { ReviewController } from './review/review.controller';
import { ReviewService } from './review/review.service';
import { ReviewModule } from './review/review.module';


import { SubmissionModule } from './submission/submission.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {MailsModule} from "./mails/mails.module";

import { LocalisationModule } from './localisation/localisation.module';
import {PaiementModule} from "./paiement/paiement.module";



@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    PaiementModule,
    AuthModule,
    UsersModule, // Ajoutez UsersModule ici
    SettingsModule,
    TermModule,
    SubmissionModule,
    ContactModule,
    ChallengesModule,
    LocalisationModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // relative path to uploads directory
      serveRoot: '/uploads', // Base URL path to serve the files from
    }),
    TeamsModule,
    CommentsModule,
    ReviewModule,
      MailsModule
  ],
  controllers: [AppController, ReviewController],
  providers: [AppService, ReviewService],

})
export class AppModule {}

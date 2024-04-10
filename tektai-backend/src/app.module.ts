import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import * as process from 'process';
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



@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    AuthModule,
    UsersModule,
    SettingsModule,
    TermModule,

    ContactModule,
    ChallengesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // relative path to uploads directory
      serveRoot: '/uploads', // Base URL path to serve the files from
    }),
    TeamsModule,
    CommentsModule,
    ReviewModule,
  ],
  controllers: [AppController, ReviewController],
  providers: [AppService, ReviewService],
})
export class AppModule {}

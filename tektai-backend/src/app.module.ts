import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import * as process from 'process';
import { MulterModule } from '@nestjs/platform-express';
import { SubmissionModule } from './submission/submission.module';
import { LocalisationModule } from './localisation/localisation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    AuthModule,
    UsersModule,
    MulterModule.register({
      dest: './uploads', // Répertoire de destination pour stocker les fichiers téléchargés
    }),
    SubmissionModule,
    LocalisationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

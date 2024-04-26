import { Module, forwardRef } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { Challenges, ChallengesSchema } from 'src/schemas/challenges.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengesController } from './challenges.controller';

import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path'; // Import extname from path module

import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Challenges.name, schema: ChallengesSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Specify the upload directory
        filename: (req, file, callback) => {
          // Extract challengeId from the request URL
          const challengeId = req.params.challengeId;
          if (!challengeId) {
            return callback(new Error('challengeId is missing in the request URL'), '');
          }
          // Get the file extension
          const fileExt = extname(file.originalname);
          // Use the challengeId as the filename with the file extension
          const filename = `${challengeId}${fileExt}`;
          callback(null, filename);
        },
      }),
    }),
    forwardRef(() => UsersModule), // Use forwardRef() to handle circular dependency

  ],
  controllers: [ChallengesController],
  providers: [ChallengesService],
  exports: [ChallengesService, MongooseModule],

})
export class ChallengesModule {}

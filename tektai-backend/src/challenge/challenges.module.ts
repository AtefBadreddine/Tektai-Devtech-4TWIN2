import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { Challenges, ChallengesSchema } from 'src/schemas/challenges.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengesController } from './challenges.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path'; // Import extname from path module
import { Request } from 'express';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Challenges.name, schema: ChallengesSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Specify the upload directory
        filename: (req: Request, dataset, callback) => {
          // Extract userId from the request URL
          const challengeId = req.params.challengeId;
          if (!challengeId) {
            return callback(new Error('challengeId is missing in the request URL'), '');
          }
          // Get the image extension
          const fileExt = extname(dataset.originalname);
          // Use the userId as the filename with the image extension
          const filename = `${challengeId}${fileExt}`;
          callback(null, filename);
        },
      }),
    }),
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}

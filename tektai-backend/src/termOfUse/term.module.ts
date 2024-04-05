import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TermController } from './term.controller';
import { TermService } from './term.service';
import { Term, TermSchema } from 'src/schemas/term.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Term.name, schema: TermSchema }])
  ],
  controllers: [TermController],
  providers: [TermService],
})
export class TermModule {}

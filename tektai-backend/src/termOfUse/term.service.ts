import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Term, TermDocument } from 'src/schemas/term.schema';
import { termDto } from './term.dto';

@Injectable()
export class TermService {
  constructor(@InjectModel(Term.name) private readonly termModel: Model<TermDocument>) {}

  async createTerms(termDtos: termDto[]): Promise<Term[]> {
    const createdTerms = [];
    for (const termDto of termDtos) {
      const createdTerm = await this.createTerm(termDto);
      createdTerms.push(createdTerm);
    }
    return createdTerms;
  }
  async createTerm(termDto: termDto): Promise<Term> {
    const createdTerm = new this.termModel(termDto);
    return createdTerm.save();
  }


  async findAllTerms(): Promise<Term[]> {
    return this.termModel.find().exec();
  }

  async findTermById(id: string): Promise<Term> {
    return this.termModel.findById(id).exec();
  }

  async updateTerm(id: string, termDto: termDto): Promise<Term> {
    return this.termModel.findByIdAndUpdate(id, termDto, { new: true }).exec();
  }

  async deleteTerm(id: string): Promise<Term> {
    return this.termModel.findByIdAndDelete(id).exec();
  }
  async findTermByTitle(title: string): Promise<Term> {
    return this.termModel.findOne({ title }).exec();
  }
  // term.service.ts

async updateTermByTitle(title: string, termDto: termDto): Promise<Term> {
  const existingTerm = await this.termModel.findOne({ title }).exec();
  if (!existingTerm) {
    throw new NotFoundException(`Term with title '${title}' not found`);
  }
  existingTerm.set(termDto);
  return existingTerm.save();
}

}

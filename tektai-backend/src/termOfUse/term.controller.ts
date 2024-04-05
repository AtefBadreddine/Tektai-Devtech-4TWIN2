import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TermService } from './term.service';
import { termDto } from './term.dto';
import { Term } from 'src/schemas/term.schema';

@Controller('term')
export class TermController {
  constructor(private readonly termService: TermService) {}

  @Post()
  async createTerms(@Body() termDtos: termDto[]): Promise<Term[]> {
    return this.termService.createTerms(termDtos);
  }

  @Get()
  async findAllTerms(): Promise<Term[]> {
    return this.termService.findAllTerms();
  }

  @Get(':id')
  async findTermById(@Param('id') id: string): Promise<Term> {
    return this.termService.findTermById(id);
  }

  @Put(':id')
  async updateTerm(@Param('id') id: string, @Body() termDto: termDto): Promise<Term> {
    return this.termService.updateTerm(id, termDto);
  }

  @Delete(':id')
  async deleteTerm(@Param('id') id: string): Promise<Term> {
    return this.termService.deleteTerm(id);
  }
  @Get('/title/:title')
  async getTermByTitle(@Param('title') title: string): Promise<Term> {
    return this.termService.findTermByTitle(title);
  }
  // term.controller.ts

@Put('title/:title')
async updateTermByTitle(@Param('title') title: string, @Body() termDto: termDto): Promise<Term> {
  return this.termService.updateTermByTitle(title, termDto);
}

}

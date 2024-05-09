// paiement.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact') // Define the endpoint for handling contact form submissions
export class ContactController {
  constructor(private readonly sendinblueService: ContactService) {}

  @Post() // Handle POST requests to /contact
  async sendContactForm(@Body() contactData: { name: string; email: string; message: string }) {
    console.log(contactData); // Log the received contact form data
    await this.sendinblueService.sendEmail(contactData.name, contactData.email, contactData.message);
    return { message: 'Contact form submitted successfully' };
  }
}

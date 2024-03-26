import { Injectable } from '@nestjs/common';
import { ApiInstance } from 'sendinblue-api';
import * as process from 'process'; // Import process for accessing environment variables
import * as SibApiV3Sdk from 'sib-api-v3-sdk';

@Injectable()
export class ContactService {
  private apiInstance: ApiInstance; // Remove readonly modifier

  constructor() {
  //  const apiKey = process.env.CONTACTUS_SENDINBLUE; // Retrieve API key from environment variable
  // this.apiInstance = new ApiInstance(apiKey); // Initialize ApiInstance with API key in the constructor
  }

  // Method to send email
  async sendEmail(name: string, email: string, message: string) {
     
    // Créer un objet Sendinblue
     const sendinblue = new SibApiV3Sdk.TransactionalEmailsApi();
     const apiKey = process.env.CONTACTUS_SENDINBLUE;
     const defaultClient = SibApiV3Sdk.ApiClient.instance;
     const apiKeyV3 = defaultClient.authentications['api-key'];
     apiKeyV3.apiKey = apiKey;

    const emailData = {
      subject: 'New Contact Form Submission',
      htmlContent: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
      sender: { name: 'TEKTAI', email: 'serinby6@gmail.com' },
      to: [{ email: 'serinebeonse@gmail.com' }],
    };

        // Envoyer l'e-mail
        try {
          await sendinblue.sendTransacEmail(emailData);
        } catch (error) {
          console.error('Error sending email:', error);
          throw new Error('Failed to send email');
        }

    //const transactionalEmailsApi = new TransactionalEmailsApi(this.apiInstance);
    //await transactionalEmailsApi.sendTransacEmail(emailData);
  }
}

import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class WhatsAppService {
  private readonly logger = new Logger(WhatsAppService.name);

  constructor(private readonly httpService: HttpService) {}
  sendLink(destination: any, href: any): void {
    const apiUrl = process.env.WHATSAPP_MESSAGE_URL; // Ensure apiUrl is defined
    const instanceId = process.env.INSTANCE_ID; // Ensure instanceId is defined
    const accessToken = process.env.ACCESS_TOKEN; // Ensure accessToken is defined
    const number = destination;
    const type = 'text';
    const message = `Please click on the link to login:\n${href}`;

    if (
      apiUrl !== undefined &&
      instanceId !== undefined &&
      accessToken !== undefined
    ) {
      // this.logger.debug(
      //   ` ${instanceId} - ${accessToken} - ${number} - ${type} - ${message} `,
      // );

      const options = {
        number: number,
        type: type,
        message: message,
        instance_id: instanceId,
        access_token: accessToken,
      };
      this.logger.debug(`options: ${JSON.stringify(options)}`);

      this.httpService
        .post(apiUrl, options)
        .subscribe((response) => this.logger.debug(response.data));
    }
  }
}

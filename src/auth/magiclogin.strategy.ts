import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';
import { WhatsAppService } from 'src/whats-app/whats-app.service';

@Injectable()
export class MagicloginStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(MagicloginStrategy.name);

  constructor(
    private authService: AuthService,
    private readonly whatsAppService: WhatsAppService,
  ) {
    super({
      secret: process.env.MAGIC_SECRET_KEY,
      jwtOptions: {
        expiresIn: '5m',
      },
      callbackUrl: process.env.MAGIC_CALLBACK_URL,
      sendMagicLink: async (destination: any, href: any) => {
        await this.sendMagicLinkViaWhatsApp(destination, href);
      },
      verify: async (
        payload: { destination: string; name?: string }, // Add a default value for the 'name' property
        callback: (arg0: null, arg1: Promise<User>) => any,
      ) => callback(null, this.validate(payload)),
    });
  }

  async validate(payload: { destination: string; name?: string }) {
    const user = await this.authService.validateUser(
      payload.destination,
      payload.name,
    );
    return user;
  }
  async sendMagicLinkViaWhatsApp(destination: string, href: string) {
    // this.logger.debug(
    //   `Jwt token is ${process.env.JWT_SECRET_KEY} - Send magic link to ${destination} with href ${href} `,
    // );
    await this.whatsAppService.sendLink(destination, href);
  }
}

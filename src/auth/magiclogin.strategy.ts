import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class MagicloginStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(MagicloginStrategy.name);

  constructor(private authService: AuthService) {
    super({
      secret: 'secret', //process.env.MAGIC_SECRET,
      jwtOptions: {
        expiresIn: '5m',
      },
      callbackUrl: 'http://localhost:3000/auth/login/callback', //process.env.MAGIC_CALLBACK_URL,
      sendMagicLink: async (destination: any, href: any) => {
        // TODO - Send magic link
        this.logger.debug(
          `Send magic link to ${destination} with href ${href}`,
        );
      },
      verify: async (
        payload: { destination: string },
        callback: (arg0: null, arg1: Promise<User>) => any,
      ) => callback(null, this.validate(payload)),
    });
  }

  async validate(payload: { destination: string }) {
    const user = await this.authService.validateUser(payload.destination);
    return user;
  }
}

import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MagicloginStrategy } from './magiclogin.strategy';
import { Request, Response } from 'express';
import { PasswordlessLoginDto } from './passwordless-login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private strategy: MagicloginStrategy,
  ) {}

  // POST /auth/login { mobile: string }  -->  send magic link
  @Post('login')
  login(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new ValidationPipe()) body: PasswordlessLoginDto,
  ) {
    this.authService.validateUser(body.destination);

    
    this.strategy.send(req, res);
  }

  // GET /auth/login/callback?token=string  -->  JWT Access Token
  @UseGuards(AuthGuard('magiclogin'))
  @Get('login/callback')
  callback(@Req() req: Request & { user: any }) {
    return this.authService.generateTokens(req.user);
  }
}

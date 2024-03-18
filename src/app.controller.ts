import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // GET /protected required JWT Access Token
  @UseGuards(AuthGuard('jwt'))
  @Get('protected')
  getProtected(@Req() req: Request): string {
    return `You are in ${(<any>req.user).mobile}!`;
  }
}

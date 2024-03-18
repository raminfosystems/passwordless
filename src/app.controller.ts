import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { JwtAuthGuard } from './auth/jwt.auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // GET /protected required JWT Access Token
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected(@Req() req: Request): string {
    return `You are in ${(<any>req.user).name}!`;
  }
}

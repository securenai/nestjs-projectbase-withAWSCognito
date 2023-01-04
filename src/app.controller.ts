import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/login')
  @Render('login')
  root() {
    return { title: 'Login' };
  }

  @Get('/register')
  @Render('register')
  registerPage() {
    return;
  }

  @Get('/verification')
  @Render('verification')
  verificationPage() {
    return;
  }
}

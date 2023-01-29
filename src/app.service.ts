import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sayWelcome(): string {
    return "Welcome to Elham Toloei's Entekhab App!";
  }
}

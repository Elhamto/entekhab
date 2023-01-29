import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserService } from './user/user.service';
import { CreateUserDto } from './user/dto/user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get()
  sayWelcome() {
    return this.appService.sayWelcome();
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const reg = await this.userService.create(createUserDto);
    return await this.authService.login(reg);
  }

  // @UseGuards(LocalAuthGuard)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('secret')
  getProfile(@Request() req) {
    return req.user;
  }
}

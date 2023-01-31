import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUserData(@Request() req?) {
    return this.userService.getUser(req.user.email);
  }

  @Post()
  addPhone(@Request() req, @Body() body){
    return this.userService.addPhone(req.user, body)
  }

  @Patch()
  addcharge(@Request() req, @Body() body) {
    return this.userService.addcharge(req.user, body);
  }

  @Delete()
  remove(@Request() req) {
    return this.userService.remove(req.user);
  }
}

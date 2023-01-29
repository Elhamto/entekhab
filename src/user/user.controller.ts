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
import { UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('edit')
  editProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.editProfile(req.user, updateUserDto);
  }

  @Get(':username')
  getUserData(@Param('username') username: string, @Request() req?) {
    return this.userService.getUserData(username, req.user);
  }

  @Delete()
  remove(@Request() req) {
    return this.userService.remove(req.user);
  }

  // @Get('followRequests/:username')
  // showFollowRequests(@Param('username') username: string) {
  //   return this.userService.showFollowRequests(username)
  // }

  // // @Get(':id')
  // // findOne(@Param('id') id: string) {
  // //   return this.userService.findOne(id);
  // // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @Post(':username')
  // acceptFollower(@Body() follow, @Param('username') username) {
  //   return this.userService.addFollower(follow.follow, username);
  // }
}

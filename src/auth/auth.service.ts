import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUser(email);
    if (user ) {
      const validPass = await bcrypt.compare(pass, user.password);
      if (validPass) {
      const { password, ...result } = user;
      return result;
      }
    }
    return null;
  }

  async login(user: any) {
    user._doc ? (user = user._doc) : user;
    const payload = { email: user.email, userId: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

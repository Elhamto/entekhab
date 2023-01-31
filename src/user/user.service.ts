import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getUser(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }

  async addPhone(user, body) {
    try {      
      await this.userModel.findOneAndUpdate(
        { _id: user.userId },
        { $push: { phoneNumber: body.phoneNumber } },
      );
    } catch (error) {
      return NotFoundException;
    }
  }
  
  addcharge(user, body) {
    return this.userModel.findOneAndUpdate(
      { _id: user.userId },
      {
        charge: { $add: ["$charge", body.charge] }
      },
    );
  }

  remove(user) {
    return this.userModel.remove({ email: user.email }).exec(); //OR
    // return this.userModel.findByIdAndRemove(user.userId).exec();
  }
}

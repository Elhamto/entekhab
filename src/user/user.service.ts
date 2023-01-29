import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
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

  editProfile(user, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne(
      { _id: user.userId },
      {
        //photo: updateUserDto.photo
        email: updateUserDto.email,
        phoneNumber: updateUserDto.phoneNumber,
        age: updateUserDto.charge,
        //changePassword
      },
    );
  }

  async getUser(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }

  async getUserData(email: string, _user?): Promise<User | any> {
    try {
    } catch (error) {
      return error.message;
    }
  }

  async addPhone(follow: string, email: string) {
    try {
      const wantedFollower = await this.userModel.findOne({
        email: follow,
      });
      if (wantedFollower.email !== email) {
        //khodesh nabayad add beshe
        return this.userModel.updateOne(
          { email: email },
          { $push: { phoneNumber: wantedFollower } },
        );
      }
    } catch (error) {
      return NotFoundException;
    }
  }

  remove(user) {
    return this.userModel.remove({ email: user.email }).exec(); //OR
    // return this.userModel.findByIdAndRemove(user.userId).exec();
  }
}

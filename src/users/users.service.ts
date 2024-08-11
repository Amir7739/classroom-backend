import { Body, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Role } from '../common/enums/role.enum';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: any): Promise<User> {
    const { password } = createUserDto;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with the hashed password
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return createdUser.save();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }


  async update(id: string, updateUserDto: any): Promise<User | null> {
    // If the password is provided in the update, hash it before saving
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    // Update the user and return the updated user
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async findByRole(role: Role): Promise<User[]> {
    return this.userModel.find({ role }).exec();
  }
}

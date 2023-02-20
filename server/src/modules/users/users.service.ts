import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from './entities/user.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RCode } from '../../common/constant/rcode';
import { Response } from 'src/common/interface/response.interface';
@Injectable()
export class UsersService {
  private response: Response;

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    try {
      const { limit, offset } = paginationQuery;
      const users = await this.userModel
        .find()
        .skip(offset)
        .limit(limit)
        .exec();
      this.response = { code: RCode.OK, msg: '获取用户成功', data: users };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取用户失败',
        data: error.response,
      };
      return this.response;
    }
  }

  //查找指定用户的service方法
  async findone(id: string) {
    try {
      const user = await this.userModel.findById({ _id: id }).exec();
      if (!user) {
        throw new NotFoundException(`User #${id} not found`);
      }
      this.response = { code: RCode.OK, msg: '获取用户成功', data: user };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取用户失败',
        data: error.response,
      };
      return this.response;
    }
  }

  //根据用户的email查找用户的service方法
  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email }).exec();
    console.log(user, email, '---------------------');
    return user;
  }

  //更新用户的service方法
  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userModel
      .findByIdAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true })
      .exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingUser;
  }

  //删除指定用户的service方法
  async remove(id: string) {
    const user = await this.userModel.findByIdAndRemove({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
}

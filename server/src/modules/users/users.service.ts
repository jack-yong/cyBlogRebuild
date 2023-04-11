import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
// import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RCode } from '../../common/constant/rcode';
import { Response } from 'src/common/interface/response.interface';
import { IsDelete, UserRole } from 'src/common/interface/common.interface';
@Injectable()
export class UsersService {
  private response: Response;

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(query: {
    nickname?: string;
    email?: string;
    role?: UserRole;
    page: number;
    pageSize: number;
  }) {
    // console.log(query, 'queryqueryquery')
    try {
      const userCount = await this.usersRepository.count({
        where: {
          ...(query.nickname && { nickname: Like(`%${query.nickname}%`) }),
          ...(query.email && { email: query.email }),
          ...(query.role && { role: query.role }),
          ...{ isDelete: IsDelete.Alive },
        },
      });
      const users = await this.usersRepository.find({
        where: {
          ...(query.nickname && { nickname: Like(`%${query.nickname}%`) }),
          ...(query.email && { email: query.email }),
          ...(query.role && { role: query.role }),
          ...{ isDelete: IsDelete.Alive },
        },
        order: {
          userId: 'DESC',
        },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      });

      // const users = await this.usersRepository.createQueryBuilder('user')
      //   .where("user.role = :role", { role: query.role })
      //   .orWhere("user.nickname = :nickName", { nickName: query.nickName })
      //   .orWhere("user.email = :email", { email: query.email })
      //   .getMany();;

      this.response = {
        code: RCode.OK,
        msg: '获取用户成功',
        data: {
          data: users,
          page: query.page,
          pageSize: query.pageSize,
          total: userCount,
        },
      };
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
      const user = await this.usersRepository.findOneBy({ userId: id });
      if (!user) throw new NotFoundException(`用户 #${id} 未找到`);
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

  // //根据用户的email查找用户的service方法
  async findUserByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email: email });
    // console.log(user, email, '---------------------');
    return user;
  }

  // //更新用户的service方法
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const existingUser = await this.usersRepository.update(
        { userId: id },
        updateUserDto,
      );
      if (!existingUser) {
        throw new NotFoundException(`用户 #${id} 不存在`);
      }
      this.response = { code: RCode.OK, msg: '更新用户成功' };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '更新用户失败',
        data: error.response,
      };
      return this.response;
    }
  }

  // //删除指定用户的service方法
  async remove(id: string) {
    const user = await this.usersRepository.delete({ userId: id });
    // console.log(user, 'removeremoveremove')
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
}

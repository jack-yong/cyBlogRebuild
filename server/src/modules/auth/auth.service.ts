import { Injectable } from '@nestjs/common';
import { RCode } from 'src/common/constant/rcode';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'src/common/interface/response.interface';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IsDelete } from 'src/common/interface/common.interface';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  private response: Response;

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validatorUser(user: LoginUserDto) {
    try {
      const email = user.email;
      const password = user.password;
      const userinfo = await this.usersService.findUserByEmail(email);
      if (!userinfo) {
        this.response = { code: RCode.FAIL, msg: `用户${email}尚未注册` };
        return this.response;
      } else if (userinfo.password !== password) {
        this.response = { code: RCode.FAIL, msg: '用户密码错误' };
        return this.response;
      } else {
        const payload = {
          userId: userinfo.userId,
          password: userinfo.password,
        };
        this.response = {
          code: RCode.OK,
          msg: '登录成功',
          data: { userinfo: userinfo, token: this.jwtService.sign(payload) },
        };
        return this.response;
      }
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '用户登录失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async login(user: LoginUserDto) {
    return await this.validatorUser(user);
  }

  //创建新用户的service方法
  async create(createUserDto: CreateUserDto) {
    try {
      const { nickname, password, email, avatar, role } = createUserDto;
      const user = new User();
      user.nickname = nickname;
      user.avatar = avatar;
      user.email = email;
      user.isDelete = IsDelete.Alive;
      user.password = password;
      user.role = role;
      user.recentlyLanched = new Date();
      this.usersRepository.save(user);
      this.response = { code: RCode.OK, msg: '新建用户成功', data: user };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '创建用户失败',
        data: error.response,
      };
      return this.response;
    }
  }
}

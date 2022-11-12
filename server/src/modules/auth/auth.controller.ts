import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: '用户登录',
  })
  public async login(@Body() user: LoginUserDto) {
    return await this.authService.login(user);
  }

  //创建用户的接口
  @Post('/create')
  @ApiBody({ description: '填写更新内容' })
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto instanceof CreateUserDto);
    return this.authService.create(createUserDto);
  }
}

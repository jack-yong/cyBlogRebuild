import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { User, UserRole } from './entities/user.entity';

@ApiTags('users')
@ApiBearerAuth()
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/findAll')
  @ApiResponse({
    status: 200,
    description: '获取系统中的所有用户(可分页)',
    type: User,
  })
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.usersService.findAll(paginationQuery);
  }

  //创建用户的接口
  @Post('/create')
  @ApiBody({ description: '填写更新内容' })
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto instanceof CreateUserDto);
    return this.usersService.create(createUserDto);
  }
}

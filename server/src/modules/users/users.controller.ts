import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Get('/findone/:id')
  findOne(@Param('id') id: string) {
    console.log(typeof id);
    return this.usersService.findone(id);
  }

  //创建用户的接口
  @Post('/create')
  @ApiBody({ description: '填写更新内容' })
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto instanceof CreateUserDto);
    return this.usersService.create(createUserDto);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  //删除指定用户的接口
  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@ApiBearerAuth()
@Controller('/users')
@UseGuards(AuthGuard('jwt'))
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

  @Get('/findUserByEmail/:email')
  findUserByEmail(@Param('id') email: string) {
    return this.usersService.findUserByEmail(email);
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

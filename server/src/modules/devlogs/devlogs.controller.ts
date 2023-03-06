import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QueryAllCommonDto } from 'src/common/dto/query-common.dto';
import { DevlogsService } from './devlogs.service';
import { CreateDevlogDto } from './dto/create-devlog.dto';
import { UpdateDevlogDto } from './dto/update-devlog.dto';
@ApiBearerAuth()
@ApiTags('devlogs')
@Controller('devlogs')
// @UseGuards(AuthGuard('jwt'))
export class DevlogsController {
  constructor(private readonly devlogsService: DevlogsService) {}

  @Post('/create')
  create(@Body() createDevlogDto: CreateDevlogDto) {
    return this.devlogsService.create(createDevlogDto);
  }

  @Get('/findAll')
  findAll(@Query() query: QueryAllCommonDto) {
    return this.devlogsService.findAll(query);
  }

  @Get('/findOne/:id')
  findOne(@Param('id') id: string) {
    return this.devlogsService.findOne(id);
  }

  @Post('/update/:id')
  update(@Param('id') id: string, @Body() updateDevlogDto: UpdateDevlogDto) {
    return this.devlogsService.update(id, updateDevlogDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.devlogsService.remove(+id);
  // }
}

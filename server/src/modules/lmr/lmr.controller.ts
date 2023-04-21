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
import { LmrService } from './lmr.service';
import { CreateLmrDto } from './dto/create-lmr.dto';
import { UpdateLmrDto } from './dto/update-lmr.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QueryAllCommonDto } from 'src/common/dto/query-common.dto';
import { FindAllMessageDto } from './dto/findAll-link.dto';

@ApiBearerAuth()
@ApiTags('/lmr')
@Controller('/lmr')
// @UseGuards(AuthGuard('jwt'))
export class LmrController {
  constructor(private readonly lmrService: LmrService) {}

  @Post('/create')
  create(@Body() createLmrDto: CreateLmrDto) {
    return this.lmrService.create(createLmrDto);
  }

  @Get('/findAll')
  findAll(@Query() query: FindAllMessageDto) {
    return this.lmrService.findAll(query);
  }

  @Get('/findOne/:id')
  findOne(@Param('id') id: string) {
    return this.lmrService.findOne(id);
  }

  @Post('/update/:id')
  update(@Param('id') id: string, @Body() updateLmrDto: UpdateLmrDto) {
    return this.lmrService.update(id, updateLmrDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.lmrService.remove(+id);
  // }
}

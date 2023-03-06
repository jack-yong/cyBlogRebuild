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
import { DspeechService } from './dspeech.service';
import { CreateDspeechDto } from './dto/create-dspeech.dto';
import { UpdateDspeechDto } from './dto/update-dspeech.dto';

@ApiBearerAuth()
@ApiTags('dspeech')
@Controller('dspeech')
// @UseGuards(AuthGuard('jwt'))
export class DspeechController {
  constructor(private readonly dspeechService: DspeechService) {}

  @Post('/create')
  create(@Body() createDspeechDto: CreateDspeechDto) {
    return this.dspeechService.create(createDspeechDto);
  }

  @Get('/findAll')
  findAll(@Query() query: QueryAllCommonDto) {
    return this.dspeechService.findAll(query);
  }

  @Get('/findOne/:id')
  findOne(@Param('id') id: string) {
    return this.dspeechService.findOne(id);
  }

  @Post('/update/:id')
  update(@Param('id') id: string, @Body() updateDspeechDto: UpdateDspeechDto) {
    return this.dspeechService.update(id, updateDspeechDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dspeechService.remove(+id);
  // }
}

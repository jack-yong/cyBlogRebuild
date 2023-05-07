import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindAllTagDto } from './dto/findAll-tag.dto';

@ApiBearerAuth()
@ApiTags('tags')
@Controller('tags')
// @UseGuards(AuthGuard('jwt'))
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post('/create')
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get('/findAll')
  findAll(@Query() query: FindAllTagDto) {
    return this.tagsService.findAll(query);
  }

  @Get('/findAllTag')
  findAllTag() {
    return this.tagsService.findAllTag();
  }

  @Get('/findOne/:id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(id);
  }

  @Post('/update/:id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(id, updateTagDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tagsService.remove(+id);
  // }
}

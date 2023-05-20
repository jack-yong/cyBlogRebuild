import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindAllTagDto } from './dto/findAll-tag.dto';
import { Response } from 'src/common/interface/response.interface';
import { RCode } from 'src/common/constant/rcode';
@ApiBearerAuth()
@ApiTags('tags')
@Controller('tags')
// @UseGuards(AuthGuard('jwt'))
export class TagsController {
  private response: Response;
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

  @Get('/findAllTagWithArticleNum')
  async findAllTagWithArticleNum() {
    try {
      const tags = await this.tagsService.getTagFollowsArticle();
      if (!tags) throw new NotFoundException(`当前没有标签存在`);
      this.response = { code: RCode.OK, msg: '获取类别成功', data: tags };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取标签失败',
        data: error.response,
      };
      return this.response;
    }
    return this.tagsService.getTagFollowsArticle();
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

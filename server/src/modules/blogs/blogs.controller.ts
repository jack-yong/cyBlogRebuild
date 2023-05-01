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
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { findAllBlogDto } from './dto/findAll-blog.dto';

@Controller('blogs')
@ApiBearerAuth()
@ApiTags('blogs')
// @UseGuards(AuthGuard('jwt'))
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post('/create')
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @Get('/findAll')
  findAll(@Query() query: findAllBlogDto) {
    // return this.blogsService.findAllBlogSnap();
    return this.blogsService.findAll(query);
  }

  @Get('/findOne/:id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @Post('/update/:id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.blogsService.remove(+id);
  // }
}

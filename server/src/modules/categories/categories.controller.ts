import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindAllCategoryDto } from './dto/findAll-category.dto';
import { RCode } from 'src/common/constant/rcode';
import { Response } from 'src/common/interface/response.interface';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('/categories')
// @UseGuards(AuthGuard('jwt'))
export class CategoriesController {
  private response: Response;
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('/create')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get('/findAll')
  findAll(@Query() query: FindAllCategoryDto) {
    return this.categoriesService.findAll(query);
  }

  @Get('/findAllCategory')
  findAllCategory() {
    return this.categoriesService.findAllCategory();
  }

  @Get('/getCategoryFollowsArticle')
  async getCategoryFollowsArticle() {
    try {
      const categories =
        await this.categoriesService.getCategoryFollowsArticle();
      if (!categories) throw new NotFoundException(`当前没有类别存在`);
      this.response = { code: RCode.OK, msg: '获取类别成功', data: categories };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取类别失败',
        data: error.response,
      };
      return this.response;
    }
  }

  @Get('/findOne/:id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoriesService.remove(id);
  // }
}

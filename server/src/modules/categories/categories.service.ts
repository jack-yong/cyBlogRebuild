import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RCode } from 'src/common/constant/rcode';
import { Like, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Response } from 'src/common/interface/response.interface';
import { IsDelete } from 'src/common/interface/common.interface';

@Injectable()
export class CategoriesService {
  private response: Response;

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const { categoryName, categoryIcon } = createCategoryDto;
      const category = new Category();
      category.categoryName = categoryName;
      category.categoryIcon = categoryIcon;
      category.categoryRank = 0;
      category.categoryCreateTime = new Date();
      category.isDeleted = IsDelete.Alive;
      this.categoryRepository.save(category);
      this.response = { code: RCode.OK, msg: '新建类别成功', data: category };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '创建类别失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    try {
      const users = await this.categoryRepository.find({
        where: {
          categoryName: Like(`%${query.keyWord}%`),
        },
        order: {
          categoryId: 'DESC',
        },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      });
      this.response = { code: RCode.OK, msg: '获取类别成功', data: users };
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

  async findOne(id: string) {
    try {
      const category = await this.categoryRepository.findOneBy({
        categoryId: id,
      });
      if (!category) throw new NotFoundException(`类别 #${id}未找到`);
      this.response = { code: RCode.OK, msg: '获取类别成功', data: category };
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

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.findOneBy({
        categoryId: id,
      });
      if (!category) throw new NotFoundException(`类别 #${id}未找到`);
      await this.categoryRepository.update(
        { categoryId: id },
        updateCategoryDto,
      );
      this.response = { code: RCode.OK, msg: '更新类别成功' };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '更新类别失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async remove(id: string) {
    return `This action removes a #${id} category`;
  }
}

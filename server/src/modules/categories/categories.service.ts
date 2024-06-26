import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RCode } from 'src/common/constant/rcode';
import { Like, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Response } from 'src/common/interface/response.interface';
import { IsDelete } from 'src/common/interface/common.interface';
import { Blog } from '../blogs/entities/blog.entity';

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
      await this.categoryRepository.save(category);
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

  async findAll(query: {
    categoryName: string;
    page: number;
    pageSize: number;
  }) {
    try {
      const categoryCount = await this.categoryRepository.count({
        where: {
          ...(query.categoryName && {
            categoryName: Like(`%${query.categoryName}%`),
          }),
          ...{ isDeleted: IsDelete.Alive },
        },
      });
      const categories = await this.categoryRepository.find({
        where: {
          ...(query.categoryName && {
            categoryName: Like(`%${query.categoryName}%`),
          }),
          ...{ isDeleted: IsDelete.Alive },
        },
        order: {
          categoryId: 'DESC',
        },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      });
      this.response = {
        code: RCode.OK,
        msg: '获取类别成功',
        data: {
          data: categories,
          total: categoryCount,
          page: query.page,
          pageSize: query.pageSize,
        },
      };
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

  async findAllCategory() {
    try {
      const categories = await this.categoryRepository.find();
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

  async getCategoryCount() {
    const categoryCount = await this.categoryRepository.count({
      where: { ...{ isDeleted: IsDelete.Alive } },
    });
    return {
      name: '类别数量',
      num: categoryCount,
      key: '/categories',
    };
  }

  async getCategoryData() {
    const categoryCount = await this.categoryRepository.count({
      where: { ...{ isDeleted: IsDelete.Alive } },
    });
    return {
      name: '类别数量',
      num: categoryCount,
      key: '/article/category',
    };
  }

  async getCategoryFollowsArticle() {
    const categoryFollowArticle = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect(
        Blog,
        'blog',
        'blog.blogCategoryId = category.categoryId',
      )
      .where('blog.isDeleted = :isDeleted', { isDeleted: IsDelete.Alive })
      .select('category.categoryName', 'name')
      .addSelect('SUM(1)', 'value')
      .addSelect('category.categoryId', 'id')
      .groupBy('category.categoryId')
      .getRawMany();
    // console.log(categoryFollowArticle)
    return categoryFollowArticle;
  }

  async remove(id: string) {
    return `This action removes a #${id} category`;
  }
}

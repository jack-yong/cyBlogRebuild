import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { Response } from 'src/common/interface/response.interface';
import { EnableComment, IsDelete } from 'src/common/interface/common.interface';
import { RCode } from 'src/common/constant/rcode';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlogsService {
  private response: Response;

  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    try {
      const {
        blogTitle,
        blogSubUrl,
        blogCoverImage,
        blogContent,
        blogCategoryId,
        blogStatus,
        blogEnableComment,
      } = createBlogDto;
      const blog = new Blog();
      blog.blogCategoryId = blogCategoryId;
      blog.blogTitle = blogTitle;
      blog.blogSubUrl = blogSubUrl;
      blog.blogCoverImage = blogCoverImage;
      blog.blogContent = blogContent;
      blog.blogStatus = blogStatus;
      blog.blogEnableComment = blogEnableComment;
      blog.blogLikes = 0;
      blog.blogViews = 0;
      blog.isDeleted = IsDelete.Alive;
      blog.blogCreateTime = new Date();
      blog.blogUpdateTime = new Date();
      await this.blogRepository.save(blog);
      this.response = { code: RCode.OK, msg: '新建博客成功', data: blog };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '创建博客失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    try {
      const blogs = await this.blogRepository.find({
        where: {
          blogTitle: Like(`%${query.keyWord}%`),
        },
        order: {
          blogId: 'DESC',
        },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      });
      this.response = { code: RCode.OK, msg: '获取博客成功', data: blogs };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取博客失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findOne(id: string) {
    try {
      const blog = await this.blogRepository.findOneBy({
        blogId: id,
      });
      if (!blog) throw new NotFoundException(`博客 #${id}未找到`);
      this.response = { code: RCode.OK, msg: '获取博客成功', data: blog };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取博客失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    try {
      const blog = await this.blogRepository.findOneBy({
        blogId: id,
      });
      if (!blog) throw new NotFoundException(`博客 #${id}未找到`);
      await this.blogRepository.update({ blogId: id }, updateBlogDto);
      this.response = { code: RCode.OK, msg: '更新博客成功' };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '更新博客失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}

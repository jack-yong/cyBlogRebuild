import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { Response } from 'src/common/interface/response.interface';
import {
  BlogStatus,
  EnableComment,
  IsDelete,
} from 'src/common/interface/common.interface';
import { RCode } from 'src/common/constant/rcode';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { BlogTagRelation } from '../tags/entities/blogTagRelation.entiry';
import { Tag } from '../tags/entities/tag.entity';
import { buildBlogDetail, filterBlogInfo } from 'src/utils';

@Injectable()
export class BlogsService {
  private response: Response;

  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(BlogTagRelation)
    private readonly BlogTagRelationRepository: Repository<BlogTagRelation>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    try {
      const {
        blogTitle,
        blogCoverImage,
        blogContent,
        blogCategoryId,
        blogStatus,
        blogEnableComment,
        blogTags,
      } = createBlogDto;
      const tagIdArr = blogTags.split('&&');
      const blog = new Blog();
      blog.blogCategoryId = blogCategoryId;
      blog.blogTitle = blogTitle;
      blog.blogCoverImage = blogCoverImage;
      blog.blogContent = blogContent;
      blog.blogStatus = blogStatus;
      blog.blogEnableComment = blogEnableComment;
      blog.blogSubUrl = 'http://101.132.119.45:8136/#/home';
      blog.blogLikes = 0;
      blog.blogViews = 0;
      blog.isDeleted = IsDelete.Alive;
      blog.blogCreateTime = new Date();
      blog.blogUpdateTime = new Date();
      await this.blogRepository.save(blog);
      tagIdArr.forEach(async (item) => {
        const blogTagRelation = new BlogTagRelation();
        blogTagRelation.btrelationBlogId = blog.blogId;
        blogTagRelation.btrelationTagId = item;
        blogTagRelation.btrelationCreateTime = new Date();
        blogTagRelation.isDeleted = IsDelete.Alive;
        await this.BlogTagRelationRepository.save(blogTagRelation);
      });
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

  async findAll(query: {
    blogTitle: string;
    blogCategoryId: string;
    blogEnableComment: EnableComment;
    blogStatus: BlogStatus;
    page: number;
    pageSize: number;
  }) {
    try {
      const blogs = await this.blogRepository
        .createQueryBuilder('blog')
        .leftJoinAndMapOne(
          'blog.categoryInfo',
          Category,
          'category',
          'blog.blogCategoryId = category.categoryId',
        )
        .leftJoinAndMapMany(
          'blog.TagInfo',
          BlogTagRelation,
          'blogtagrelation',
          'blog.blogId = blogtagrelation.btrelationBlogId',
        )
        .leftJoinAndMapMany(
          'blogtagrelation.tag',
          Tag,
          'tag',
          'blogtagrelation.btrelationTagId = tag.tagId',
        )
        .where({
          ...(query.blogTitle && { blogTitle: Like(`%${query.blogTitle}%`) }),
          ...(query.blogCategoryId && { blogCategoryId: query.blogCategoryId }),
          ...(query.blogEnableComment && {
            blogEnableComment: query.blogEnableComment,
          }),
          ...(query.blogStatus && { blogStatus: query.blogStatus }),
          ...{ isDeleted: IsDelete.Alive },
        })
        .skip((query.page - 1) * query.pageSize)
        .take(query.pageSize)
        .getMany();
      // console.log(blogs)
      const blogCount = await this.blogRepository
        .createQueryBuilder('blog')
        .where({
          ...(query.blogTitle && { blogTitle: Like(`%${query.blogTitle}%`) }),
          ...(query.blogCategoryId && { blogCategoryId: query.blogCategoryId }),
          ...(query.blogStatus && { blogStatus: query.blogStatus }),
          ...{ isDeleted: IsDelete.Alive },
        })
        .getCount();
      this.response = {
        code: RCode.OK,
        msg: '获取博客成功',
        data: {
          data: filterBlogInfo(blogs),
          total: blogCount,
          page: query.page,
          pageSize: query.pageSize,
        },
      };
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

  // async findAllBlogSnap() {
  //   try {
  //     const blogs = await this.blogRepository
  //       .createQueryBuilder('blog')
  //       .leftJoinAndMapOne(
  //         'blog.categoryInfo',
  //         Category,
  //         'category',
  //         'blog.blogCategoryId = category.categoryId',
  //       )
  //       .leftJoinAndMapMany(
  //         'blog.TagInfo',
  //         BlogTagRelation,
  //         'blogtagrelation',
  //         'blog.blogId = blogtagrelation.btrelationBlogId'
  //       )
  //       .leftJoinAndMapMany(
  //         'blogtagrelation.tag',
  //         Tag,
  //         'tag',
  //         'blogtagrelation.btrelationTagId = tag.tagId'
  //       )
  //       .getMany();
  //     this.response = { code: RCode.OK, msg: '获取博客成功', data: blogs };
  //     return this.response;
  //   } catch (error) {
  //     this.response = {
  //       code: RCode.ERROR,
  //       msg: '获取博客失败',
  //       data: error.response,
  //     };
  //     return this.response;
  //   }
  // }

  async findOne(id: string) {
    try {
      const blog = await this.blogRepository
        .createQueryBuilder('blog')
        .leftJoinAndMapMany(
          'blog.TagInfo',
          BlogTagRelation,
          'blogtagrelation',
          'blog.blogId = blogtagrelation.btrelationBlogId',
        )
        .leftJoinAndMapMany(
          'blogtagrelation.tag',
          Tag,
          'tag',
          'blogtagrelation.btrelationTagId = tag.tagId',
        )
        .where({
          blogId: id,
          ...{ isDeleted: IsDelete.Alive },
        })
        .getOne();

      if (!blog) throw new NotFoundException(`博客 #${id}未找到`);
      this.response = {
        code: RCode.OK,
        msg: '获取博客成功',
        data: buildBlogDetail(blog),
      };
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
      const { blogTags, ...restUpdateBlogDto } = updateBlogDto;
      const blog = await this.blogRepository.findOneBy({
        blogId: id,
      });
      if (!blog) throw new NotFoundException(`博客 #${id}未找到`);
      await this.blogRepository.update({ blogId: id }, restUpdateBlogDto);
      if (blogTags) {
        await this.BlogTagRelationRepository.delete({ btrelationBlogId: id });
        const tagIdArr = blogTags.split('&&');
        tagIdArr.forEach(async (item) => {
          const curTagInfo = await this.tagRepository.findOneBy({
            tagName: item,
          });
          const blogTagRelation = new BlogTagRelation();
          blogTagRelation.btrelationBlogId = id;
          blogTagRelation.btrelationTagId = curTagInfo.tagId;
          blogTagRelation.btrelationCreateTime = new Date();
          blogTagRelation.isDeleted = IsDelete.Alive;
          await this.BlogTagRelationRepository.save(blogTagRelation);
        });
      }
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

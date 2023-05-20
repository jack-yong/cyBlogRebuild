import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { Response } from 'src/common/interface/response.interface';
import {
  ArticleType,
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
import { UsersService } from '../users/users.service';
import { TagsService } from '../tags/tags.service';
import { DevlogsService } from '../devlogs/devlogs.service';
import { CategoriesService } from '../categories/categories.service';
import { LmrService } from '../lmr/lmr.service';
import { CommentsService } from '../comments/comments.service';
import { DspeechService } from '../dspeech/dspeech.service';
import { LinksService } from '../links/links.service';
import { PortfolioService } from '../portfolio/portfolio.service';

@Injectable()
export class BlogsService {
  private response: Response;

  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(BlogTagRelation)
    private readonly BlogTagRelationRepository: Repository<BlogTagRelation>,
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    private readonly devlogsService: DevlogsService,
    private readonly categoriesService: CategoriesService,
    private readonly lmrService: LmrService,
    private readonly commentsService: CommentsService,
    private readonly dspeechService: DspeechService,
    private readonly linksService: LinksService,
    private readonly portfolioService: PortfolioService,
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
    blogTags: string;
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
        // .skip((query.page - 1) * query.pageSize)
        // .take(query.pageSize)
        .getMany();
      // console.log(blogs)
      // const blogCount = await this.blogRepository
      //   .createQueryBuilder('blog')
      //   .where({
      //     ...(query.blogTitle && { blogTitle: Like(`%${query.blogTitle}%`) }),
      //     ...(query.blogCategoryId && { blogCategoryId: query.blogCategoryId }),
      //     ...(query.blogStatus && { blogStatus: query.blogStatus }),
      //     ...{ isDeleted: IsDelete.Alive },
      //   })
      //   .getCount();
      // console.log(blogs, 'blogs')
      const startPos = (query.page - 1) * query.pageSize;
      const endPos = startPos + query.pageSize;
      const { data, total } = filterBlogInfo(
        blogs,
        query.blogTags,
        startPos,
        endPos,
      );
      // console.log(data)
      this.response = {
        code: RCode.OK,
        msg: '获取博客成功',
        data: {
          data,
          total,
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
          const curTagInfo = await this.tagsService.getTagByName(item);
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

  async getBlogCount() {
    const blogCount = await this.blogRepository.count({
      where: { ...{ isDeleted: IsDelete.Alive } },
    });
    return {
      name: '文章数量',
      num: blogCount,
      key: '/articles/manage',
    };
  }

  async getBlogData() {
    const blogCount = await this.blogRepository.count({
      where: { ...{ isDeleted: IsDelete.Alive } },
    });
    return {
      name: '文章数量',
      num: blogCount,
      key: '/article/search',
    };
  }

  async getHomeData() {
    try {
      const blogCountInfo = await this.getBlogData();
      const tagCountInfo = await this.tagsService.getTagData();
      const categoryCountInfo = await this.categoriesService.getCategoryData();
      this.response = {
        code: RCode.OK,
        msg: '获取博客各类信息成功',
        data: [blogCountInfo, tagCountInfo, categoryCountInfo],
      };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取博客各类信息失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async getHomeInfo() {
    try {
      const blogCountInfo = await this.getBlogCount();
      const tagCountInfo = await this.tagsService.getTagCount();
      const userCountInfo = await this.usersService.getUserCount();
      const categoryCountInfo = await this.categoriesService.getCategoryCount();
      const devlogCountInfo = await this.devlogsService.getDevlogCount();
      const lmrCountInfo = await this.lmrService.getLmrCount();
      const commentCountInfo = await this.commentsService.getCommentCount();
      const portfolioCountInfo =
        await this.portfolioService.getPortfolioCount();
      const linkCountInfo = await this.linksService.getLinkCount();
      const dspeechCountInfo = await this.dspeechService.getDspeechCount();
      this.response = {
        code: RCode.OK,
        msg: '获取博客各类信息成功',
        data: [
          blogCountInfo,
          tagCountInfo,
          userCountInfo,
          categoryCountInfo,
          devlogCountInfo,
          lmrCountInfo,
          dspeechCountInfo,
          commentCountInfo,
          portfolioCountInfo,
          linkCountInfo,
        ],
      };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取博客各类信息失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async getArticleInfo(type: ArticleType) {
    // console.log(type)
    try {
      if (type === ArticleType.tag) {
        const info = await this.tagsService.getTagFollowsArticle();
        this.response = {
          code: RCode.OK,
          msg: '获取文章分类数量信息成功',
          data: {
            type: '标签',
            data: info,
          },
        };
      } else {
        const info = await this.categoriesService.getCategoryFollowsArticle();
        this.response = {
          code: RCode.OK,
          msg: '获取文章分类数量信息成功',
          data: {
            type: '类别',
            data: info,
          },
        };
      }
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取文章分类数量信息失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async getCalendarInfo(year: string) {
    try {
      const calendarInfo = await this.blogRepository
        .createQueryBuilder('blog')
        .andWhere(`YEAR(blog.blogCreateTime)=YEAR(NOW())`)
        .select("DATE_FORMAT(blog.blogCreateTime,'%Y-%m-%d') blogCreateTime")
        .addSelect('SUM(1)', 'num')
        .groupBy('blogCreateTime')
        .getRawMany();
      // console.log(calendarInfo)
      this.response = {
        code: RCode.OK,
        msg: '获取文章上传数据成功',
        data: calendarInfo,
      };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取文章上传数据失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}

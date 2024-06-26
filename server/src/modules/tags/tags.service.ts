import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { Response } from 'src/common/interface/response.interface';
import { IsDelete } from 'src/common/interface/common.interface';
import { RCode } from 'src/common/constant/rcode';
import { BlogTagRelation } from './entities/blogTagRelation.entiry';

@Injectable()
export class TagsService {
  private response: Response;
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    try {
      const { tagName, tagColor } = createTagDto;
      const tag = new Tag();
      tag.tagName = tagName;
      tag.tagColor = tagColor;
      tag.isDeleted = IsDelete.Alive;
      tag.tagCreateTime = new Date();
      await this.tagRepository.save(tag);
      this.response = { code: RCode.OK, msg: '新建标签成功', data: tag };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '创建标签失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findAll(query: { tagName: string; page: number; pageSize: number }) {
    try {
      const tagCount = await this.tagRepository.count({
        where: {
          ...(query.tagName && { tagName: Like(`%${query.tagName}%`) }),
          ...{ isDeleted: IsDelete.Alive },
        },
      });
      const tags = await this.tagRepository.find({
        where: {
          ...(query.tagName && { tagName: Like(`%${query.tagName}%`) }),
          ...{ isDeleted: IsDelete.Alive },
        },
        order: {
          tagId: 'DESC',
        },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      });

      this.response = {
        code: RCode.OK,
        msg: '获取标签集合成功',
        data: {
          data: tags,
          total: tagCount,
          page: query.page,
          pageSize: query.pageSize,
        },
      };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取标签集合失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findAllTag() {
    try {
      const tags = await this.tagRepository.find();
      if (!tags) throw new NotFoundException(`当前没有标签存在`);
      this.response = {
        code: RCode.OK,
        msg: '获取标签集合成功',
        data: tags,
      };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取标签集合失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findOne(id: string) {
    try {
      const tag = await this.tagRepository.findOneBy({
        tagId: id,
      });
      if (!tag) throw new NotFoundException(`标签 #${id}未找到`);
      this.response = { code: RCode.OK, msg: '获取标签成功', data: tag };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取标签失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    try {
      const tag = await this.tagRepository.findOneBy({
        tagId: id,
      });
      if (!tag) throw new NotFoundException(`标签 #${id}未找到`);
      await this.tagRepository.update({ tagId: id }, updateTagDto);
      this.response = { code: RCode.OK, msg: '更新标签成功' };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '更新标签失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async getTagCount() {
    const tagcount = await this.tagRepository.count({
      where: { ...{ isDeleted: IsDelete.Alive } },
    });
    return {
      name: '标签数量',
      num: tagcount,
      key: '/tags',
    };
  }

  async getTagData() {
    const tagcount = await this.tagRepository.count({
      where: { ...{ isDeleted: IsDelete.Alive } },
    });
    return {
      name: '标签数量',
      num: tagcount,
      key: '/article/tag',
    };
  }

  async getTagByName(tagName: string) {
    return await this.tagRepository.findOneBy({
      tagName: tagName,
    });
  }

  async getTagFollowsArticle() {
    const tagFollowArticle = await this.tagRepository
      .createQueryBuilder('tag')
      .leftJoinAndSelect(
        BlogTagRelation,
        'blogtagrelation',
        'blogtagrelation.btrelationTagId = tag.tagId',
      )
      .select('tag.tagName', 'name')
      .addSelect('SUM(1)', 'value')
      .addSelect('tag.tagId', 'id')
      .addSelect('tag.tagColor', 'tagColor')
      .groupBy('tag.tagId')
      .getRawMany();
    // console.log(tagFollowArticle)
    return tagFollowArticle;
  }

  remove(id: string) {
    return `This action removes a #${id} tag`;
  }
}

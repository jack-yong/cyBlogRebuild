import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link } from './entities/link.entity';
import { Response } from 'src/common/interface/response.interface';
import { RCode } from 'src/common/constant/rcode';
import { IsDelete, linkType } from 'src/common/interface/common.interface';

@Injectable()
export class LinksService {
  private response: Response;

  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}
  async create(createLinkDto: CreateLinkDto) {
    try {
      const { linkName, linkDescription, linkUrl, linkAvater, linkType } =
        createLinkDto;
      const link = new Link();
      link.linkName = linkName;
      link.linkDescription = linkDescription;
      link.linkAvater = linkAvater;
      link.linkUrl = linkUrl;
      link.linkType = linkType;
      link.linkRank = 0;
      link.isDeleted = IsDelete.Alive;
      link.linkDate = new Date();
      await this.linkRepository.save(link);
      this.response = { code: RCode.OK, msg: '新建友链成功', data: link };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '创建友链失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findAll(query: {
    linkName: string;
    linkDescription: string;
    linkType: linkType;
    page: number;
    pageSize: number;
  }) {
    try {
      const linkCount = await this.linkRepository.count({
        where: {
          ...(query.linkName && { linkName: Like(`%${query.linkName}%`) }),
          ...(query.linkDescription && {
            linkDescription: Like(`%${query.linkDescription}%`),
          }),
          ...(query.linkType && { linkType: query.linkType }),
          ...{ isDeleted: IsDelete.Alive },
        },
      });
      const links = await this.linkRepository.find({
        where: {
          ...(query.linkName && { linkName: Like(`%${query.linkName}%`) }),
          ...(query.linkDescription && {
            linkDescription: Like(`%${query.linkDescription}%`),
          }),
          ...(query.linkType && { linkType: query.linkType }),
          ...{ isDeleted: IsDelete.Alive },
        },
        order: {
          linkId: 'DESC',
        },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      });
      this.response = {
        code: RCode.OK,
        msg: '获取友链成功',
        data: {
          data: links,
          total: linkCount,
          page: query.page,
          pageSize: query.pageSize,
        },
      };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取友链失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findAllData() {
    try {
      const links = await this.linkRepository.find({
        where: {
          ...{ isDeleted: IsDelete.Alive },
        },
        order: {
          linkId: 'DESC',
        },
      });
      this.response = {
        code: RCode.OK,
        msg: '获取友链成功',
        data: links,
      };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取友链失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findOne(id: string) {
    try {
      const link = await this.linkRepository.findOneBy({
        linkId: id,
      });
      if (!link) throw new NotFoundException(`友链 #${id}未找到`);
      this.response = { code: RCode.OK, msg: '获取日志成功', data: link };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取友链失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async update(id: string, updateLinkDto: UpdateLinkDto) {
    try {
      const link = await this.linkRepository.findOneBy({
        linkId: id,
      });
      if (!link) throw new NotFoundException(`友链 #${id}未找到`);
      await this.linkRepository.update({ linkId: id }, updateLinkDto);
      this.response = { code: RCode.OK, msg: '更新友链成功' };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '更新友链失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async getLinkCount() {
    const lmrCount = await this.linkRepository.count({
      where: { ...{ isDeleted: IsDelete.Alive } },
    });
    return {
      name: '友链数量',
      num: lmrCount,
      key: '/links',
    };
  }

  async remove(id: string) {
    return `This action removes a #${id} link`;
  }
}

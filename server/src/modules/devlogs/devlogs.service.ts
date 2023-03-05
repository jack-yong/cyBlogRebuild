import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RCode } from 'src/common/constant/rcode';
import { Like, Repository } from 'typeorm';
import { CreateDevlogDto } from './dto/create-devlog.dto';
import { UpdateDevlogDto } from './dto/update-devlog.dto';
import { Devlog } from './entities/devlog.entity';
import { Response } from 'src/common/interface/response.interface';
import { IsDelete } from 'src/common/interface/common.interface';

@Injectable()
export class DevlogsService {
  private response: Response;

  constructor(
    @InjectRepository(Devlog)
    private readonly devlogRepository: Repository<Devlog>,
  ) {}

  async create(createDevlogDto: CreateDevlogDto) {
    try {
      const { dlTitle, dlType, dlContent } = createDevlogDto;
      const devlog = new Devlog();
      devlog.dlTitle = dlTitle;
      devlog.dlType = dlType;
      devlog.dlContent = dlContent;
      devlog.isDeleted = IsDelete.Alive;
      devlog.dlDate = new Date();
      this.devlogRepository.save(devlog);
      this.response = { code: RCode.OK, msg: '新建日志成功', data: devlog };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '创建日志失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    try {
      const devlogs = await this.devlogRepository.find({
        where: {
          dlTitle: Like(`%${query.keyWord}%`),
        },
        order: {
          devlogId: 'DESC',
        },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      });
      this.response = { code: RCode.OK, msg: '获取日志成功', data: devlogs };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取日志失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findOne(id: string) {
    try {
      const devlog = await this.devlogRepository.findOneBy({
        devlogId: id,
      });
      if (!devlog) throw new NotFoundException(`日志 #${id}未找到`);
      this.response = { code: RCode.OK, msg: '获取日志成功', data: devlog };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取日志失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async update(id: string, updateDevlogDto: UpdateDevlogDto) {
    try {
      const devlog = await this.devlogRepository.findOneBy({
        devlogId: id,
      });
      if (!devlog) throw new NotFoundException(`类别 #${id}未找到`);
      await this.devlogRepository.update({ devlogId: id }, updateDevlogDto);
      this.response = { code: RCode.OK, msg: '更新日志成功' };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '更新日志失败',
        data: error.response,
      };
      return this.response;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} devlog`;
  }
}

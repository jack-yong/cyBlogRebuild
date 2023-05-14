import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RCode } from 'src/common/constant/rcode';
import { IsDelete } from 'src/common/interface/common.interface';
import { Like, Repository } from 'typeorm';
import { CreateDspeechDto } from './dto/create-dspeech.dto';
import { UpdateDspeechDto } from './dto/update-dspeech.dto';
import { Dspeech } from './entities/dspeech.entity';
import { Response } from 'src/common/interface/response.interface';

@Injectable()
export class DspeechService {
  private response: Response;

  constructor(
    @InjectRepository(Dspeech)
    private readonly dspeechRepository: Repository<Dspeech>,
  ) {}
  async create(createDspeechDto: CreateDspeechDto) {
    try {
      const { dspeechContent, dspeechPicsUrl } = createDspeechDto;
      const dspeech = new Dspeech();
      dspeech.dspeechContent = dspeechContent;
      dspeech.dspeechPicsUrl = dspeechPicsUrl;
      dspeech.isDeleted = IsDelete.Alive;
      dspeech.dspeechDate = new Date();
      await this.dspeechRepository.save(dspeech);
      this.response = { code: RCode.OK, msg: '新建说说成功', data: dspeech };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '创建说说失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findAll(query: {
    dspeechContent: string;
    page: number;
    pageSize: number;
  }) {
    try {
      const dspeechcount = await this.dspeechRepository.count({
        where: {
          ...(query.dspeechContent && {
            dspeechContent: Like(`%${query.dspeechContent}%`),
          }),
          ...{ isDeleted: IsDelete.Alive },
        },
      });
      const dspeech = await this.dspeechRepository.find({
        where: {
          ...(query.dspeechContent && {
            dspeechContent: Like(`%${query.dspeechContent}%`),
          }),
          ...{ isDeleted: IsDelete.Alive },
        },
        order: {
          dspeechId: 'DESC',
        },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      });
      this.response = {
        code: RCode.OK,
        msg: '获取说说成功',
        data: {
          data: dspeech,
          total: dspeechcount,
          page: query.page,
          pageSize: query.pageSize,
        },
      };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取说说失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findAllData() {
    try {
      const dspeech = await this.dspeechRepository.find({
        where: {
          ...{ isDeleted: IsDelete.Alive },
        },
        order: {
          dspeechId: 'DESC',
        },
      });
      this.response = {
        code: RCode.OK,
        msg: '获取说说成功',
        data: dspeech,
      };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取说说失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findOne(id: string) {
    try {
      const dspeech = await this.dspeechRepository.findOneBy({
        dspeechId: id,
      });
      if (!dspeech) throw new NotFoundException(`说说 #${id}未找到`);
      this.response = { code: RCode.OK, msg: '获取说说成功', data: dspeech };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取说说失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async update(id: string, updateDspeechDto: UpdateDspeechDto) {
    try {
      const dspeech = await this.dspeechRepository.findOneBy({
        dspeechId: id,
      });
      if (!dspeech) throw new NotFoundException(`说说 #${id}未找到`);
      await this.dspeechRepository.update({ dspeechId: id }, updateDspeechDto);
      this.response = { code: RCode.OK, msg: '更新说说成功' };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '更新说说失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async getDspeechCount() {
    const dspeechCount = await this.dspeechRepository.count({
      where: { ...{ isDeleted: IsDelete.Alive } },
    });
    return {
      name: '说说数量',
      num: dspeechCount,
      key: '/talks',
    };
  }

  remove(id: string) {
    return `This action removes a #${id} dspeech`;
  }
}

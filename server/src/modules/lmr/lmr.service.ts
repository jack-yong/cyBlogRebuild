import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsDelete, IsRead } from 'src/common/interface/common.interface';
import { Like, Repository } from 'typeorm';
import { CreateLmrDto } from './dto/create-lmr.dto';
import { UpdateLmrDto } from './dto/update-lmr.dto';
import { Lmr } from './entities/lmr.entity';
import { Response } from 'src/common/interface/response.interface';
import { RCode } from 'src/common/constant/rcode';

@Injectable()
export class LmrService {
  private response: Response;

  constructor(
    @InjectRepository(Lmr)
    private readonly lmrRepository: Repository<Lmr>,
  ) {}
  async create(createLmrDto: CreateLmrDto) {
    try {
      const { lmrAnswererId, lmrFatherid, lmrContent } = createLmrDto;
      const lmr = new Lmr();
      lmr.lmrAnswererId = lmrAnswererId;
      lmr.lmrFatherid = lmrFatherid;
      lmr.lmrContent = lmrContent;
      lmr.isRead = IsRead.unread;
      lmr.isDeleted = IsDelete.Alive;
      lmr.lmrDate = new Date();
      this.lmrRepository.save(lmr);
      this.response = { code: RCode.OK, msg: '新建留言成功', data: lmr };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '创建留言失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    try {
      const lmrs = await this.lmrRepository.find({
        where: {
          lmrContent: Like(`%${query.keyWord}%`),
        },
        order: {
          lmrId: 'DESC',
        },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      });
      this.response = { code: RCode.OK, msg: '获取留言成功', data: lmrs };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取留言失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findOne(id: string) {
    try {
      const lmr = await this.lmrRepository.findOneBy({
        lmrId: id,
      });
      if (!lmr) throw new NotFoundException(`留言 #${id}未找到`);
      this.response = { code: RCode.OK, msg: '获取留言成功', data: lmr };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取留言失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async update(id: string, updateLmrDto: UpdateLmrDto) {
    try {
      const lmr = await this.lmrRepository.findOneBy({
        lmrId: id,
      });
      if (!lmr) throw new NotFoundException(`留言 #${id}未找到`);
      await this.lmrRepository.update({ lmrId: id }, updateLmrDto);
      this.response = { code: RCode.OK, msg: '更新留言成功' };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '更新留言失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async remove(id: string) {
    return `This action removes a #${id} lmr`;
  }
}

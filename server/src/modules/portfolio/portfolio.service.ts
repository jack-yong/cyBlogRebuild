import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Response } from 'src/common/interface/response.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from './entities/portfolio.entity';
import { Like, Repository } from 'typeorm';
import { RCode } from 'src/common/constant/rcode';
import { IsDelete } from 'src/common/interface/common.interface';

@Injectable()
export class PortfolioService {
  private response: Response;
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto) {
    try {
      const {
        portfolioTitle,
        portfolioDescribe,
        portfolioImgurl,
        portfolioUrl,
      } = createPortfolioDto;
      const portfolio = new Portfolio();
      portfolio.portfolioTitle = portfolioTitle;
      portfolio.portfolioDescribe = portfolioDescribe;
      portfolio.portfolioImgurl = portfolioImgurl;
      portfolio.portfolioUrl = portfolioUrl;
      portfolio.isDeleted = IsDelete.Alive;
      portfolio.portfolioDate = new Date();
      this.portfolioRepository.save(portfolio);
      this.response = { code: RCode.OK, msg: '新建作品成功', data: portfolio };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '创建作品失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    try {
      const portfolios = await this.portfolioRepository.find({
        where: {
          portfolioTitle: Like(`%${query.keyWord}%`),
        },
        order: {
          portfolioId: 'DESC',
        },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      });
      this.response = {
        code: RCode.OK,
        msg: '获取作品集成功',
        data: portfolios,
      };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取作品集失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findOne(id: string) {
    try {
      const portfolios = await this.portfolioRepository.findOneBy({
        portfolioId: id,
      });
      if (!portfolios) throw new NotFoundException(`作品 #${id}未找到`);
      this.response = { code: RCode.OK, msg: '获取作品成功', data: portfolios };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取作品失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async update(id: string, updatePortfolioDto: UpdatePortfolioDto) {
    try {
      const portfolios = await this.portfolioRepository.findOneBy({
        portfolioId: id,
      });
      if (!portfolios) throw new NotFoundException(`作品 #${id}未找到`);
      await this.portfolioRepository.update(
        { portfolioId: id },
        updatePortfolioDto,
      );
      this.response = { code: RCode.OK, msg: '更新作品成功' };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '更新作品失败',
        data: error.response,
      };
      return this.response;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} portfolio`;
  }
}

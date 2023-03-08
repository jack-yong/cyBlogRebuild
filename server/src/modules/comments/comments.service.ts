import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsDelete, IsPass } from 'src/common/interface/common.interface';
import { Like, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Response } from 'src/common/interface/response.interface';
import { RCode } from 'src/common/constant/rcode';

@Injectable()
export class CommentsService {
  private response: Response;

  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    try {
      const { commentBlogId, commentAnswererid, commentFatherid, commentBody } =
        createCommentDto;
      const comment = new Comment();
      comment.commentBlogId = commentBlogId;
      comment.commentAnswererid = commentAnswererid;
      comment.commentBody = commentBody;
      comment.commentFatherid = commentFatherid;
      comment.isDeleted = IsDelete.Alive;
      comment.isPass = IsPass.pass;
      comment.commentCreateTime = new Date();
      await this.commentRepository.save(comment);
      this.response = { code: RCode.OK, msg: '新建评论成功', data: comment };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '创建评论失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    try {
      const comments = await this.commentRepository.find({
        where: {
          commentBody: Like(`%${query.keyWord}%`),
        },
        order: {
          commentId: 'DESC',
        },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      });
      this.response = { code: RCode.OK, msg: '获取评论成功', data: comments };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取评论失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async findOne(id: string) {
    try {
      const comment = await this.commentRepository.findOneBy({
        commentId: id,
      });
      if (!comment) throw new NotFoundException(`评论 #${id}未找到`);
      this.response = { code: RCode.OK, msg: '获取评论成功', data: comment };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '获取评论失败',
        data: error.response,
      };
      return this.response;
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      const comment = await this.commentRepository.findOneBy({
        commentId: id,
      });
      if (!comment) throw new NotFoundException(`评论 #${id}未找到`);
      await this.commentRepository.update({ commentId: id }, updateCommentDto);
      this.response = { code: RCode.OK, msg: '更新评论成功' };
      return this.response;
    } catch (error) {
      this.response = {
        code: RCode.ERROR,
        msg: '更新评论失败',
        data: error.response,
      };
      return this.response;
    }
  }

  remove(id: string) {
    return `This action removes a #${id} comment`;
  }
}

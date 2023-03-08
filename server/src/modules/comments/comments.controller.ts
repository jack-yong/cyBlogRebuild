import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QueryAllCommonDto } from 'src/common/dto/query-common.dto';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
@ApiBearerAuth()
@ApiTags('comments')
// @UseGuards(AuthGuard('jwt'))
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/create')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get('/findAll')
  findAll(@Query() query: QueryAllCommonDto) {
    return this.commentsService.findAll(query);
  }

  @Get('/findOne/:id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Post('/update/:id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.commentsService.remove(id);
  // }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FindAllLinkDto } from './dto/findAll-link.dto';

@ApiBearerAuth()
@ApiTags('links')
@Controller('links')
// @UseGuards(AuthGuard('jwt'))
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linksService.create(createLinkDto);
  }

  @Get('/findAll')
  findAll(@Query() query: FindAllLinkDto) {
    return this.linksService.findAll(query);
  }

  @Get('/findOne/:id')
  findOne(@Param('id') id: string) {
    return this.linksService.findOne(id);
  }

  @Post('/update/:id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linksService.update(id, updateLinkDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.linksService.remove(id);
  // }
}

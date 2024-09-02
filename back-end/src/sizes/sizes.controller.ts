import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { GetSizesDto } from './dto/GetSizesDto';
import { AdminGuard } from './guards/admin/admin.guard';
import { CreateSizeDto } from './dto/CreateSizeDto';
import { DeleteSizeDto } from './dto/DeleteSizeDto';

@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Get('/getSizes/:storeId')
  async getSizes(
    @Param() getSizesDto: GetSizesDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res.status(200).json(await this.sizesService.getSizes(getSizesDto));
  }

  @Post('/createSize')
  @UseGuards(AdminGuard)
  async createSize(
    @Body() createSizeDto: CreateSizeDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res.status(201).json(await this.sizesService.createSize(createSizeDto));
  }

  @Delete('/deleteSize/:userId/:sizeId')
  @UseGuards(AdminGuard)
  async deleteSize(
    @Param() deleteSizeDto: DeleteSizeDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res.status(200).json(await this.sizesService.deleteSize(deleteSizeDto));
  }
}

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
import { ColorsService } from './colors.service';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { GetColorsDto } from './dto/GetColorsDto';
import { AdminGuard } from './guards/admin/admin.guard';
import { CreateColorDto } from './dto/CreateColorDto';
import { DeleteColorDto } from './dto/DeleteColorDto';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Get('/getColors/:storeId')
  async getColors(
    @Param() getColorsDto: GetColorsDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res.status(200).json(await this.colorsService.getColors(getColorsDto));
  }

  @Post('/createColor')
  @UseGuards(AdminGuard)
  async createColor(
    @Body() createColorDto: CreateColorDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res.status(201).json(await this.colorsService.createColor(createColorDto));
  }

  @Delete('/deleteColor')
  @UseGuards(AdminGuard)
  async deleteColor(
    @Body() deleteColorDto: DeleteColorDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res.status(200).json(await this.colorsService.deleteColor(deleteColorDto));
  }
}

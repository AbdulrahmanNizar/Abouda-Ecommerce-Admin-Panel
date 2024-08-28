import {
  Controller,
  Post,
  Res,
  Body,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { CreateCategoryDto } from './dto/CreateCategoryDto';
import { AdminGuard } from './guards/admin/admin.guard';
import { GetCategoriesDto } from './dto/GetCategoriesDto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/getCategories/:storeId')
  async getCategories(
    @Param() getCategoriesDto: GetCategoriesDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(await this.categoriesService.getCategories(getCategoriesDto));
  }

  @Post('/createCategory')
  @UseGuards(AdminGuard)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(201)
      .json(await this.categoriesService.createCategory(createCategoryDto));
  }
}

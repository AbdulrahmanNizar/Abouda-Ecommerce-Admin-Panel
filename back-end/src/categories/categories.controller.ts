import { Controller, Post, Res, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { CreateCategoryDto } from './dto/CreateCategoryDto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('/createCategory')
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(201)
      .json(await this.categoriesService.createCategory(createCategoryDto));
  }
}

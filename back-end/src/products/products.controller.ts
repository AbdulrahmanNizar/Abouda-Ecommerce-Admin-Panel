import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AdminGuard } from './guards/admin/admin.guard';
import { CreateProductDto } from './dto/CreateProductDto';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/createProduct')
  @UseGuards(AdminGuard)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(201)
      .json(await this.productsService.createProduct(createProductDto));
  }
}

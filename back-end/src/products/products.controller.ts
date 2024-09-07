import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AdminGuard } from './guards/admin/admin.guard';
import { CreateProductDto } from './dto/CreateProductDto';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { GetProductsDto } from './dto/GetProductsDto';
import { DeleteProductDto } from './dto/DeleteProductDto';

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

  @Get('/getProducts/:storeId')
  async getProducts(
    @Param() getProductsDto: GetProductsDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(await this.productsService.getProducts(getProductsDto));
  }

  @Delete('/deleteProduct')
  @UseGuards(AdminGuard)
  async deleteProduct(
    @Body() deleteProductDto: DeleteProductDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(await this.productsService.deleteProduct(deleteProductDto));
  }
}

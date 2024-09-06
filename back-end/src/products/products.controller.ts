import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { AdminGuard } from './guards/admin/admin.guard';
import { CreateProductDto } from './dto/CreateProductDto';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/createProduct')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @UploadedFile() file,
    @Body() createProductDto: CreateProductDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    if (!file) {
      console.log('file not uploaded');
    } else {
      res
        .status(201)
        .json(await this.productsService.createProduct(createProductDto, file));
    }
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.model';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { CreateProductDto } from './dto/CreateProductDto';
import { todayDate } from 'src/helpers/Date';
import { currentTime } from 'src/helpers/Time';
import { GetProductsDto } from './dto/GetProductsDto';
import { DeleteProductDto } from './dto/DeleteProductDto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
  async createProduct(
    requestInfo: CreateProductDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const productInDB = await this.productModel.find({
        productName: requestInfo.productName,
      });

      if (productInDB.length > 0) {
        throw new HttpException('The product name is already exist', 400);
      } else {
        const newProduct = new this.productModel({
          storeId: requestInfo.storeId,
          storeName: requestInfo.storeName,
          productName: requestInfo.productName,
          productSize: requestInfo.productSize,
          productColor: requestInfo.productColor,
          productCategory: requestInfo.productCategory,
          productImage: requestInfo.productImage,
          createdAtDate: todayDate,
          createdAtTime: currentTime,
        });

        await newProduct.save();
        return {
          successMessage: 'Product created successfully',
          statusCode: 201,
        };
      }
    } catch (err) {
      console.log(err);
      throw new HttpException(err, err.status);
    }
  }

  async getProducts(
    requestInfo: GetProductsDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const productsInDB = await this.productModel.find({
        storeId: requestInfo.storeId,
      });

      return {
        successMessage: 'Got the products successfully',
        statusCode: 200,
        data: productsInDB,
      };
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async deleteProduct(
    requestInfo: DeleteProductDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      await this.productModel.deleteOne({ _id: requestInfo.productId });

      return {
        successMessage: 'Product deleted successfully',
        statusCode: 200,
      };
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }
}

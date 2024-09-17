import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './orders.model';
import { StoreManagement } from 'src/stores-management/stores-management.model';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { CreateOrderDto } from './dto/CreateOrderDto';
import { Product } from 'src/products/products.model';
import { todayDate } from 'src/helpers/Date';
import { currentTime } from 'src/helpers/Time';
import { GetOrdersDto } from './dto/GetOrdersDto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly ordersModel: Model<Order>,
    @InjectModel('Store') private readonly storesModel: Model<StoreManagement>,
    @InjectModel('Product') private readonly productsModel: Model<Product>,
  ) {}

  async createOrder(
    requestInfo: CreateOrderDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      let orderLocalPrice = 0;

      for (let i = 0; i < requestInfo.orderedProducts.length; i++) {
        const currentProduct = await this.productsModel.find({
          _id: requestInfo.orderedProducts[i],
        });

        orderLocalPrice += currentProduct[0].productPrice;
      }

      const newOrder = new this.ordersModel({
        storeId: requestInfo.storeId,
        storeName: requestInfo.storeName,
        userId: requestInfo.userId,
        userName: requestInfo.userName,
        userPhoneNumber: requestInfo.userPhoneNumber,
        orderedProducts: requestInfo.orderedProducts,
        orderedProductsPrices: Math.floor(orderLocalPrice) + 0.99,
        createdAtDate: todayDate,
        createdAtTime: currentTime,
      });

      await newOrder.save();
      return {
        successMessage: 'Order created successfully',
        statusCode: 201,
      };
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async getOrders(
    requestInfo: GetOrdersDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const storeOrders = await this.ordersModel.find({
        storeId: requestInfo.storeId,
      });

      return {
        successMessage: 'Got the orders successfully',
        statusCode: 200,
        data: storeOrders,
      };
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }
}

import { Body, Controller, Delete, Get, Post, Res } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/CreateOrderDto';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { GetOrdersDto } from './dto/GetOrdersDto';
import { DeleteOrderDto } from './dto/DeleteOrderDto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/createOrder')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res.status(201).json(await this.ordersService.createOrder(createOrderDto));
  }

  @Get('/getOrders')
  async getOrders(
    @Body() getOrdersDto: GetOrdersDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res.status(200).json(await this.ordersService.getOrders(getOrdersDto));
  }

  @Delete('/deleteOrder')
  async deleteOrder(
    @Body() deleteOrderDto: DeleteOrderDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res.status(200).json(await this.ordersService.deleteOrder(deleteOrderDto));
  }
}

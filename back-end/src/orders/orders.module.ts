import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { orderSchema } from './orders.model';
import { storeManagementSchema } from 'src/stores-management/stores-management.model';
import { productSchema } from 'src/products/products.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: orderSchema },
      { name: 'Store', schema: storeManagementSchema },
      { name: 'Product', schema: productSchema },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { storeManagementSchema } from 'src/stores-management/stores-management.model';
import { productSchema } from './products.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Store', schema: storeManagementSchema },
      { name: 'Product', schema: productSchema },
    ]),
    MulterModule.register({
      dest: './images',
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

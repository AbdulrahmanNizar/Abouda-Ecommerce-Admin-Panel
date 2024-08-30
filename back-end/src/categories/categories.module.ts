import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { storeManagementSchema } from 'src/stores-management/stores-management.model';
import { categorySchema } from './categories.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Store', schema: storeManagementSchema },
      { name: 'Category', schema: categorySchema },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}

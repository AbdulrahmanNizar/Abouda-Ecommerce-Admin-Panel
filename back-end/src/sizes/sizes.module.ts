import { Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { sizeSchema } from './sizes.model';
import { storeManagementSchema } from 'src/stores-management/stores-management.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Size', schema: sizeSchema },
      { name: 'Store', schema: storeManagementSchema },
    ]),
  ],
  controllers: [SizesController],
  providers: [SizesService],
})
export class SizesModule {}

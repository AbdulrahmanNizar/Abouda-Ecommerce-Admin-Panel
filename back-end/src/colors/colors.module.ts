import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { storeManagementSchema } from 'src/stores-management/stores-management.model';
import { colorSchema } from './colors.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Store', schema: storeManagementSchema },
      { name: 'Color', schema: colorSchema },
    ]),
  ],
  controllers: [ColorsController],
  providers: [ColorsService],
})
export class ColorsModule {}

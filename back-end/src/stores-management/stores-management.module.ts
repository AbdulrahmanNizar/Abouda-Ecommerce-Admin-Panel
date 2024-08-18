import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoresManagementController } from './stores-management.controller';
import { StoresManagementService } from './stores-management.service';
import { storeManagementSchema } from './stores-management.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Store', schema: storeManagementSchema },
    ]),
  ],
  controllers: [StoresManagementController],
  providers: [StoresManagementService],
})
export class StoresManagementModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersManagementService } from './users-management.service';
import { UsersManagementController } from './users-management.controller';
import { registrationSchema } from 'src/registration/registration.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: registrationSchema }]),
  ],
  controllers: [UsersManagementController],
  providers: [UsersManagementService],
})
export class UsersManagementModule {}

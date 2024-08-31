import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationModule } from './registration/registration.module';
import { StoresManagementModule } from './stores-management/stores-management.module';
import { UsersManagementModule } from './users-management/users-management.module';
import { CategoriesModule } from './categories/categories.module';
import { SizesModule } from './sizes/sizes.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/abouda-e-commerce-admin-panel',
    ),
    RegistrationModule,
    StoresManagementModule,
    UsersManagementModule,
    CategoriesModule,
    SizesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

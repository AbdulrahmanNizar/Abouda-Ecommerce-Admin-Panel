import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/abouda-e-commerce-admin-panel',
    ),
    RegistrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { MongooseModule } from '@nestjs/mongoose';
import { registrationSchema } from './registration.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'aboudasecretkey2010510',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: registrationSchema }]),
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}

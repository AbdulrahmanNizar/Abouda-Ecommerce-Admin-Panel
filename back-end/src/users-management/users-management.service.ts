import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { Registration } from 'src/registration/registration.model';
import { GetUserInformationDto } from './dto/GetUserInformationDto';

@Injectable()
export class UsersManagementService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<Registration>,
  ) {}

  async getUserInfo(
    requestInfo: GetUserInformationDto,
  ): Promise<SuccessResponseObjectDto | void> {
    const userInDB = await this.userModel.find({
      username: requestInfo.username,
    });

    if (userInDB.length > 0) {
      return {
        successMessage: 'Got the user information successfully',
        statusCode: 200,
        data: { username: userInDB[0].username, userId: userInDB[0]._id },
      };
    }
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { Registration } from 'src/registration/registration.model';
import { GetUserInformationDto } from './dto/GetUserInformationDto';
import { GetUserSuggestionDto } from './dto/GetUserSuggestionDto';

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
    } else {
      throw new HttpException("User doesn't exist", 404);
    }
  }

  async getUserNameSuggestion(
    requestInfo: GetUserSuggestionDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const usersInDB = await this.userModel.find();
      const usersNames: string[] = [];

      for (let i = 0; i < usersInDB.length; i++) {
        usersNames.push(usersInDB[i].username);
      }

      const filteredUsers = usersNames.filter((username) => {
        return username.toLowerCase().includes(requestInfo.username);
      });

      return {
        successMessage: 'Got the users names',
        statusCode: 200,
        data: filteredUsers,
      };
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }
}

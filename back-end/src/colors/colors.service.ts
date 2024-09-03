import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Color } from './colors.model';
import { GetColorsDto } from './dto/GetColorsDto';
import { CreateColorDto } from './dto/CreateColorDto';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { currentTime } from 'src/helpers/Time';
import { todayDate } from 'src/helpers/Date';
import { DeleteColorDto } from './dto/DeleteColorDto';

@Injectable()
export class ColorsService {
  constructor(
    @InjectModel('Color') private readonly colorModel: Model<Color>,
  ) {}

  async getColors(
    requestInfo: GetColorsDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const colorsInDB = await this.colorModel.find({
        storeId: requestInfo.storeId,
      });
      return {
        successMessage: 'Got the colors successfully',
        statusCode: 200,
        data: colorsInDB,
      };
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async createColor(
    requestInfo: CreateColorDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const colorInDB = await this.colorModel.find({
        colorName: requestInfo.colorName,
        storeId: requestInfo.storeId,
      });

      if (colorInDB.length > 0) {
        throw new HttpException('The color name is already exist', 400);
      } else {
        const newColor = new this.colorModel({
          storeId: requestInfo.storeId,
          storeName: requestInfo.storeName,
          colorName: requestInfo.colorName,
          createdAtTime: currentTime,
          createdAtDate: todayDate,
        });

        await newColor.save();

        return {
          successMessage: 'Color created successfully',
          statusCode: 201,
          data: newColor._id,
        };
      }
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async deleteColor(
    requestInfo: DeleteColorDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      await this.colorModel.deleteOne({ _id: requestInfo.colorId });
      return {
        successMessage: 'Color deleted successully',
        statusCode: 200,
      };
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }
}

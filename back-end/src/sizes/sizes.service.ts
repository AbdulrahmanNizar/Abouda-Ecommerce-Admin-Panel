import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Size } from './sizes.model';
import { GetSizesDto } from './dto/GetSizesDto';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { CreateSizeDto } from './dto/CreateSizeDto';
import { sizeLetter } from 'src/helpers/SizeLetter';
import { currentTime } from 'src/helpers/Time';
import { todayDate } from 'src/helpers/Date';
import { DeleteSizeDto } from './dto/DeleteSizeDto';

@Injectable()
export class SizesService {
  constructor(@InjectModel('Size') private readonly sizeModel: Model<Size>) {}

  async getSizes(
    requestInfo: GetSizesDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const sizesInDB = await this.sizeModel.find({
        storeId: requestInfo.storeId,
      });
      return {
        successMessage: 'Got the sizes successfully',
        statusCode: 200,
        data: sizesInDB,
      };
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async createSize(
    requestInfo: CreateSizeDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const sizeInDB = await this.sizeModel.find({
        sizeName: requestInfo.sizeName,
      });

      if (sizeInDB.length > 0) {
        throw new HttpException('The size name is already exist', 400);
      } else {
        const newSize = new this.sizeModel({
          storeId: requestInfo.storeId,
          storeName: requestInfo.storeName,
          sizeName: requestInfo.sizeName,
          sizeLetter: sizeLetter(requestInfo.sizeName),
          createdAtTime: currentTime,
          createdAtDate: todayDate,
        });

        await newSize.save();

        return {
          successMessage: 'Size created successfully',
          statusCode: 201,
        };
      }
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async deleteSize(
    requestInfo: DeleteSizeDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      console.log('started');
      await this.sizeModel.deleteOne({ _id: requestInfo.sizeId });
      return {
        successMessage: 'Size deleted successfully',
        statusCode: 200,
      };
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }
}

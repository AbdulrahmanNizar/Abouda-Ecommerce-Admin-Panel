import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { StoreManagement } from 'src/stores-management/stores-management.model';
import { CreateCategoryDto } from './dto/CreateCategoryDto';
import { todayDate } from 'src/helpers/Date';
import { currentTime } from 'src/helpers/Time';
import { GetCategoriesDto } from './dto/GetCategoriesDto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Store') private readonly storeModel: Model<StoreManagement>,
  ) {}

  async getCategories(
    requestInfo: GetCategoriesDto,
  ): Promise<SuccessResponseObjectDto | void> {
    const storeInDB = await this.storeModel.find({ _id: requestInfo.storeId });
    const selectedStoreCategories = storeInDB[0].storeCategories;

    return {
      successMessage: 'Got the categories successfully',
      statusCode: 200,
      data: selectedStoreCategories,
    };
  }

  async createCategory(
    requestInfo: CreateCategoryDto,
  ): Promise<SuccessResponseObjectDto | void> {
    const storeInDB = await this.storeModel.find({
      _id: requestInfo.storeId,
    });
    const selectedStoreCategories: any[] = storeInDB[0].storeCategories;

    if (selectedStoreCategories.length == 0) {
      selectedStoreCategories.push({
        categoryName: requestInfo.categoryName,
        createdAtDate: todayDate,
        createdAtTime: currentTime,
      });
    } else {
      for (let i = 0; i < selectedStoreCategories.length; i++) {
        if (
          selectedStoreCategories[i].categoryName != requestInfo.categoryName
        ) {
          selectedStoreCategories.push({
            categoryName: requestInfo.categoryName,
            createdAtDate: todayDate,
            createdAtTime: currentTime,
          });

          await this.storeModel.updateOne(
            { _id: requestInfo.storeId },
            { $set: { storeCategories: selectedStoreCategories } },
          );

          return {
            successMessage: 'Category created successfully',
            statusCode: 201,
          };
        } else {
          throw new HttpException('The category name is already exist', 400);
        }
      }
    }
  }
}

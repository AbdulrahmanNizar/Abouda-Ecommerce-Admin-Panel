import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { StoreManagement } from 'src/stores-management/stores-management.model';
import { CreateCategoryDto } from './dto/CreateCategoryDto';
import { todayDate } from 'src/helpers/Date';
import { currentTime } from 'src/helpers/Time';
import { GetCategoriesDto } from './dto/GetCategoriesDto';
import { Category } from './categories.model';
import { DeleteCategoryDto } from './dto/DeleteCategoryDto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Store') private readonly storeModel: Model<StoreManagement>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async getCategories(
    requestInfo: GetCategoriesDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const storeInDB = await this.categoryModel.find({
        storeId: requestInfo.storeId,
      });
      const selectedStoreCategories = storeInDB;

      return {
        successMessage: 'Got the categories successfully',
        statusCode: 200,
        data: selectedStoreCategories,
      };
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async createCategory(
    requestInfo: CreateCategoryDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const categoryInDB = await this.categoryModel.find({
        $and: [
          { storeId: requestInfo.storeId },
          { categoryName: requestInfo.categoryName },
        ],
      });

      if (categoryInDB.length == 0) {
        const newCategory = new this.categoryModel({
          categoryName: requestInfo.categoryName,
          storeId: requestInfo.storeId,
          storeName: requestInfo.storeName,
          createdAtDate: todayDate,
          createdAtTime: currentTime,
        });

        await newCategory.save();

        return {
          successMessage: 'Category created successfully',
          statusCode: 201,
        };
      } else {
        for (let i = 0; i < categoryInDB.length; i++) {
          if (categoryInDB[0].categoryName != requestInfo.categoryName) {
            const newCategory = new this.categoryModel({
              categoryName: requestInfo.categoryName,
              storeId: requestInfo.storeId,
              storeName: requestInfo.storeName,
              createdAtDate: todayDate,
              createdAtTime: currentTime,
            });

            await newCategory.save();

            return {
              successMessage: 'Category created successfully',
              statusCode: 201,
            };
          } else {
            throw new HttpException('The category name is already exist', 400);
          }
        }
      }
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async deleteCategory(
    requestInfo: DeleteCategoryDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      await this.categoryModel.deleteOne({ _id: requestInfo.categoryId });
      return {
        successMessage: 'Category deleted successfully',
        statusCode: 200,
      };
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoreManagement } from './stores-management.model';
import { CreateStoreDto } from './dto/CreateStoreDto';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { GetStoresDto } from './dto/GetStoresDto';
import { todayDate } from 'src/helpers/Date';
import { DeleteStoreDto } from './dto/DeleteStoreDto';

@Injectable()
export class StoresManagementService {
  constructor(
    @InjectModel('Store') private readonly storeModel: Model<StoreManagement>,
  ) {}

  async getStores(
    requestInfo: GetStoresDto,
  ): Promise<SuccessResponseObjectDto> {
    try {
      // Getting the stores
      const storesInDB: any = await this.storeModel.find();
      const userStores: string[] = [];

      // looping throght the stores
      for (let i = 0; i < storesInDB.length; i++) {
        // looping throght the admins stores
        for (let j = 0; j < storesInDB[i].storeAdmins.length; j++) {
          // checking if the user id was in the current store admins
          if (requestInfo.userId == storesInDB[i].storeAdmins[j]) {
            // pushing the store
            userStores.push(storesInDB[i]);
          }
        }
      }

      // done
      return {
        successMessage: 'Got the stores successfully',
        statusCode: 200,
        data: userStores,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async createStore(
    requestInfo: CreateStoreDto,
  ): Promise<SuccessResponseObjectDto> {
    const storesInDB = await this.storeModel.find({
      storeName: requestInfo.storeName,
    });

    // checking if the store name exist or no
    if (storesInDB.length > 0) {
      throw new HttpException('The store name is already exist', 400);
    } else {
      // adding the new store to the database
      try {
        const newStore = new this.storeModel({
          storeName: requestInfo.storeName,
          storeAdmins: requestInfo.storeAdmins,
          createdAt: todayDate,
        });
        // saving the new store in the database
        await newStore.save();

        // done
        return {
          successMessage: 'Store created successfully',
          statusCode: 201,
          data: { storeId: newStore._id },
        };
      } catch (err) {
        // logging an error if there was
        console.log(err);
      }
    }
  }

  async deleteStore(
    requestInfo: DeleteStoreDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      // deleting the selected store
      await this.storeModel.deleteOne({ _id: requestInfo.storeId });

      return {
        successMessage: 'Store deleted successfully',
        statusCode: 200,
      };
    } catch (err) {
      // logging an error if there was
      console.log(err);
    }
  }
}

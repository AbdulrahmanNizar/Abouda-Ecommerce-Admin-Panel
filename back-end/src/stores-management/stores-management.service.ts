import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoreManagement } from './stores-management.model';
import { CreateStoreDto } from './dto/CreateStoreDto';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { GetStoresDto } from './dto/GetStoresDto';
import { todayDate } from 'src/helpers/Date';
import { DeleteStoreDto } from './dto/DeleteStoreDto';
import { UpdateStoreDto } from './dto/UpdateStoreDto';

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
          storeProducts: [],
          storeSales: 0,
          storeTotalRevenue: 0,
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

  async updateStore(
    requestInfo: UpdateStoreDto,
  ): Promise<SuccessResponseObjectDto | void> {
    // checking if the new store name exist or no
    const storesInDB = await this.storeModel.find({
      storeName: requestInfo.newStoreName,
    });

    if (storesInDB.length > 0) {
      // throwing an error if the new store name exist
      throw new HttpException('The new store name is already exist', 400);
    } else {
      // getting the selected store by it id
      const storeInDB = await this.storeModel.find({
        _id: requestInfo.storeId,
      });
      const storeAdmins = storeInDB[0].storeAdmins;

      // looping throught the new admins
      for (let i = 0; i < requestInfo.newStoreAdmins.length; i++) {
        // checking if the store admins doesn't include the new admin
        if (!storeAdmins.includes(requestInfo.newStoreAdmins[i])) {
          // pushing the new admin to the store admins
          storeAdmins.push(requestInfo.newStoreAdmins[i]);
        }
      }

      // updating the store settings in the database
      await this.storeModel.updateOne(
        { _id: requestInfo.storeId },
        {
          $set: {
            storeName: requestInfo.newStoreName,
            storeAdmins: storeAdmins,
          },
        },
      );

      // done
      return {
        successMessage: 'Store updated successfully',
        statusCode: 200,
      };
    }
  }

  async deleteStore(
    requestInfo: DeleteStoreDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      // deleting the selected store
      await this.storeModel.deleteOne({ _id: requestInfo.storeId });

      // done
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

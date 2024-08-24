import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { StoresManagementService } from './stores-management.service';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { CreateStoreDto } from './dto/CreateStoreDto';
import { GetStoresDto } from './dto/GetStoresDto';
import { DeleteStoreDto } from './dto/DeleteStoreDto';
import { UpdateStoreDto } from './dto/UpdateStoreDto';
import { GetStoreDetailsDto } from './dto/GetStoreDetailsDto';

@Controller('stores-management')
export class StoresManagementController {
  constructor(
    private readonly storesManagementService: StoresManagementService,
  ) {}

  @Get('/getStores/:userId')
  async getStores(
    @Param() getStoresDto: GetStoresDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(await this.storesManagementService.getStores(getStoresDto));
  }

  @Get('/getStoreDetails/:storeId')
  async getStoreDetails(
    @Param() getStoreDetailsDto: GetStoreDetailsDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(
        await this.storesManagementService.getStoreDetails(getStoreDetailsDto),
      );
  }

  @Post('/createStore')
  async createStore(
    @Body() createStoreDto: CreateStoreDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(201)
      .json(await this.storesManagementService.createStore(createStoreDto));
  }

  @Patch('/updateStore')
  async updateStore(
    @Body() updateStoreDto: UpdateStoreDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(await this.storesManagementService.updateStore(updateStoreDto));
  }

  @Delete('/deleteStore')
  async deleteStore(
    @Body() deleteStoreDto: DeleteStoreDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(await this.storesManagementService.deleteStore(deleteStoreDto));
  }
}

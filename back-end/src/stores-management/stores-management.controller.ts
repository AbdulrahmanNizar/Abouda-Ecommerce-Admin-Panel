import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { StoresManagementService } from './stores-management.service';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { CreateStoreDto } from './dto/CreateStoreDto';
import { GetStoresDto } from './dto/GetStoresDto';
import { DeleteStoreDto } from './dto/DeleteStoreDto';

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

  @Post('/createStore')
  async createStore(
    @Body() createStoreDto: CreateStoreDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(201)
      .json(await this.storesManagementService.createStore(createStoreDto));
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

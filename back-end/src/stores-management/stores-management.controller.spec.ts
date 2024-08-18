import { Test, TestingModule } from '@nestjs/testing';
import { StoresManagementController } from './stores-management.controller';

describe('StoresManagementController', () => {
  let controller: StoresManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoresManagementController],
    }).compile();

    controller = module.get<StoresManagementController>(StoresManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

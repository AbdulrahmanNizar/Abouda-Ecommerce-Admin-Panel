import { Test, TestingModule } from '@nestjs/testing';
import { StoresManagementService } from './stores-management.service';

describe('StoresManagementService', () => {
  let service: StoresManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoresManagementService],
    }).compile();

    service = module.get<StoresManagementService>(StoresManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

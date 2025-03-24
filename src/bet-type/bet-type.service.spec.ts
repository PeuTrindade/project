import { Test, TestingModule } from '@nestjs/testing';
import { BetTypeService } from './bet-type.service';

describe('BetTypeService', () => {
  let service: BetTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BetTypeService],
    }).compile();

    service = module.get<BetTypeService>(BetTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

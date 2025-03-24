import { Test, TestingModule } from '@nestjs/testing';
import { BetTypeController } from './bet-type.controller';

describe('BetTypeController', () => {
  let controller: BetTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BetTypeController],
    }).compile();

    controller = module.get<BetTypeController>(BetTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

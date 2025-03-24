import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BetType } from 'src/database/core/betType.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BetTypeService {
  constructor(
    @InjectRepository(BetType)
    private betTypeRepository: Repository<BetType>,
  ) {}

  async find(): Promise<BetType[]> {
    return await this.betTypeRepository.find();
  }
}

import { Module } from '@nestjs/common';
import { BetTypeService } from './bet-type.service';
import { BetTypeController } from './bet-type.controller';
import { BetType } from 'src/database/core/betType.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BetType])],
  providers: [BetTypeService],
  controllers: [BetTypeController],
})
export class BetTypeModule {}

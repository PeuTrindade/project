import { Module } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { DestinationController } from './destination.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from 'src/database/core/destination.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Destination])],
  providers: [DestinationService],
  controllers: [DestinationController],
})
export class DestinationModule {}

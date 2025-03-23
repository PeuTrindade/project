import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Destination } from 'src/database/core/destination.entity';
import { CreateDestinationDTO } from 'src/interface/destination/create_destination.interface';
import { UpdateDestinationDTO } from 'src/interface/destination/update_destination.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(Destination)
    private destinationRepository: Repository<Destination>,
  ) {}

  async update({
    id,
    award,
    limit,
    name,
  }: UpdateDestinationDTO): Promise<UpdateResult> {
    return await this.destinationRepository.update(id, { award, limit, name });
  }

  async create({
    award,
    limit,
    name,
  }: CreateDestinationDTO): Promise<Destination> {
    return await this.destinationRepository.save({ award, name, limit });
  }

  async find(): Promise<Destination[]> {
    return await this.destinationRepository.find();
  }

  async findById(id: string): Promise<Destination | null> {
    return await this.destinationRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.destinationRepository.delete(id);
  }
}

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DestinationService } from './destination.service';
import { JwtAuthGuard } from 'src/auth/jwt_auth.guard';
import { CreateDestinationDTO } from 'src/interface/destination/create_destination.interface';
import { UpdateDestinationDTO } from 'src/interface/destination/update_destination.interface';

@Controller('destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() { award, limit, name }: CreateDestinationDTO) {
    try {
      const destination = await this.destinationService.create({
        award,
        limit,
        name,
      });

      return { message: 'Destino cadastrado com sucesso!', destination };
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocorreu um erro interno! Tente novamente.',
        error,
      );
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() { award, limit, name }: UpdateDestinationDTO,
  ) {
    try {
      if (!id) {
        throw new NotFoundException(
          'ID inválido ou inexistente! Tente novamente.',
        );
      }

      if (!name && !limit && !award) {
        throw new BadRequestException('Campos inválidos! Tente novamente.');
      }

      const result = await this.destinationService.update({
        id,
        award,
        limit,
        name,
      });

      if (result.affected == 0) {
        throw new BadRequestException(
          'Ocorreu um erro ao atualizar destino! Tente novamente.',
        );
      }

      return { message: 'Destino alterado com sucesso!' };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Ocorreu um erro interno! Tente novamente.',
        error,
      );
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      const destinations = await this.destinationService.find();

      return destinations;
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocorreu um erro interno! Tente novamente.',
        error,
      );
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    try {
      const destination = await this.destinationService.findById(id);

      if (!destination) {
        throw new NotFoundException('Destino não encontrado! Tente novamente.');
      }

      return destination;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Ocorreu um erro interno! Tente novamente.',
        error,
      );
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    try {
      const result = await this.destinationService.delete(id);

      if (result.affected == 0) {
        throw new NotFoundException(
          'Ocorreu um erro ao tentar deletar destino! Tente novamente.',
        );
      }

      return { message: 'Deleção realizada com sucesso!' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Ocorreu um erro interno! Tente novamente.',
        error,
      );
    }
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/database/core/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registra a entidade User no TypeORM
  providers: [UserService], // Injeta UserService como um provedor
  controllers: [UserController], // Registra o UserController
  exports: [UserService], // Exporta UserService para ser usado em outros módulos
})
export class UserModule {}

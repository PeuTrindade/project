import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Destination extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'float', default: false })
  award: number;

  @Column({ type: 'integer', default: false })
  limit: number;
}

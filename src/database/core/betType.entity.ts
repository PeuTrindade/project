import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class BetType extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'float', default: false })
  price: number;

  @Column({ type: 'integer', default: false })
  amount: number;
}

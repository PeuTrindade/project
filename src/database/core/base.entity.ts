import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ type: 'datetime' })
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  readonly updatedAt!: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt!: Date;
}

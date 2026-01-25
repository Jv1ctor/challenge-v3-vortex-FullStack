import { Factory } from 'src/modules/factories/entities/factory.entity';
import { Machine } from 'src/modules/machines/entities/machine.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('registries')
export class Registries {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('float')
  value: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Machine, (machine) => machine.registries, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'machine_id' })
  machine: Machine;

  @ManyToOne(() => Factory, (factory) => factory.registries, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'factory_id' })
  factory: Factory;

  @ManyToOne(() => User, (user) => user.registries, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

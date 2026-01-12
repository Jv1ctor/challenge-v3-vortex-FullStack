import { Machine } from 'src/machines/entities/machine.entity';
import { User } from 'src/users/entities/user.entity';
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

  @ManyToOne(() => Machine, (machine) => machine.registries)
  @JoinColumn({ name: 'machine_id' })
  machine: Machine;

  @ManyToOne(() => User, (user) => user.registries)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

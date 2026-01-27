import { Machine } from 'src/modules/machines/entities/machine.entity';
import { Registries } from 'src/modules/registries/entities/registries.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('factories')
export class Factory {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { nullable: true, length: 225, unique: true })
  name: string;

  @Column('varchar', { nullable: true })
  address: string;

  @Column('varchar', { nullable: true })
  city: string;

  @Column('varchar', { nullable: true })
  country: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @OneToMany(() => User, (user) => user.factory)
  users: User[];

  @OneToMany(() => Machine, (machines) => machines.factory)
  machines: Machine[];

  @OneToMany(() => Registries, (registry) => registry.factory)
  registries: Registries[];
}

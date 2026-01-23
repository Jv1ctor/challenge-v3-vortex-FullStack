import { Factory } from 'src/modules/factories/entities/factory.entity';
import { Registries } from 'src/modules/registries/entities/registries.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200, nullable: true, unique: true })
  name: string;

  @Column('varchar', { nullable: true })
  password: string;

  @Column('bool', { name: 'is_admin', default: false })
  isAdmin: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Factory, (factory) => factory.users)
  @JoinColumn({ name: 'factory_id' })
  factory: Factory;

  @OneToMany(() => Registries, (registries) => registries.user)
  registries: Registries;
}

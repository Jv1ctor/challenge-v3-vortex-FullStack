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
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('machines')
@Unique(['factory', 'name'])
export class Machine {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 225 })
  name: string;

  @Column('varchar', { nullable: true })
  model: string;

  @Column('varchar', { nullable: true })
  manufacturer: string;

  @Column('text', { nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Factory, (factory) => factory.machines, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'factory_id' })
  factory: Factory;

  @OneToMany(() => Registries, (registries) => registries.machine)
  registries: Registries;
}

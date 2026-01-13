import { Factory } from 'src/factories/entities/factory.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('machines')
export class Machine {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 225, unique: true })
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

  @ManyToOne(() => Factory, (factory) => factory.machines)
  @JoinColumn({ name: 'factory_id' })
  factory: Factory;
}

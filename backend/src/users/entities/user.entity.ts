import { Factory } from 'src/factories/entities/factory.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
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

  @ManyToOne(() => Factory, (factory) => factory.users)
  @JoinColumn({ name: 'factory_id' })
  factory: Factory;
}

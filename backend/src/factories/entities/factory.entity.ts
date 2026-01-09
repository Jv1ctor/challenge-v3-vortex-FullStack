import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => User, (user) => user.factory)
  users: User[];
}

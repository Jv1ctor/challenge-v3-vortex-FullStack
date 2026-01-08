import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string 
  
  @Column("varchar", { length: 200, nullable: true, unique: true })
  name: string

  @Column("varchar",  { nullable: true })
  password: string

  @Column("bool", { name: "is_admin", default: false })
  isAdmin: boolean

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date
}
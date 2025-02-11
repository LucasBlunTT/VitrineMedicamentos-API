import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';
import Permission from './Permission';

@Entity()
export default class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  description!: string;

  @Column({ default: new Date() })
  created_at!: Date;

  @Column({ nullable: true })
  updated_at!: Date;

  @ManyToMany(() => User, user => user.roles)
  users!: User[];

  @ManyToMany(() => Permission, permission => permission.roles)
  @JoinTable({ name: 'permission_role' })
  permissions!: Permission[];
}

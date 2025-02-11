import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Role from './Role';

@Entity()
export default class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  description!: string;

  @Column({ default: new Date() })
  created_at!: Date;

  @Column({ nullable: true })
  updated_at!: Date;

  @ManyToMany(() => Role, role => role.permissions)
  @JoinTable({ name: 'permission_role' })
  roles!: Role[];
}

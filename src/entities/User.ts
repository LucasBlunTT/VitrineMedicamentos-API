import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import Medicamento from './Medicamento';
import Role from './Role';

@Entity('user')
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ default: true })
  active!: boolean;

  @Column({ default: new Date() })
  created_at!: Date;

  @Column({ nullable: true })
  updated_at!: Date;

  @OneToMany(() => Medicamento, medicamento => medicamento.user, {
    cascade: true,
  })
  medicamentos!: Medicamento[];

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({ name: 'user_roles' })
  roles!: Role[];
}

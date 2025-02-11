import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import Medicamento from './Medicamento';
import Role from '../../entities/Role';

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

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({ name: 'author_roles' })
  roles!: Role[];

  @OneToMany(() => Medicamento, medicamento => medicamento.user, {
    cascade: true,
  }) // Relacionamento OneToMany com Medicamento
  medicamentos!: Medicamento[]; // Propriedade para armazenar os medicamentos associados ao usuário
}

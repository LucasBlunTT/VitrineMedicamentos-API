import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Medicamento from '../entities/Medicamento';

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

  @OneToMany(() => Medicamento, (medicamento) => medicamento.user, { cascade: true }) // Relacionamento OneToMany com Medicamento
  medicamentos!: Medicamento[]; // Propriedade para armazenar os medicamentos associados ao usuário
}

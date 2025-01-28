import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '../entities/User';

@Entity('medicamento')
export default class Medicamento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ nullable: true })
  descricao?: string;

  @Column()
  quantidade!: number;

  @ManyToOne(() => User, (user) => user.medicamentos, { onDelete: 'CASCADE' }) // Relacionamento ManyToOne com User
  @JoinColumn({ name: 'user_id' }) // Define o nome da coluna de chave estrangeira
  user!: User;
}

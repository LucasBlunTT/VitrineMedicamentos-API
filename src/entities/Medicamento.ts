import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';

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

  @Column({ default: true })
  active!: boolean;

  @Column({ default: new Date() })
  created_at!: Date;

  @Column({ nullable: true })
  updated_at!: Date;

  @ManyToOne(() => User, user => user.medicamentos, { onDelete: 'CASCADE' }) // Relacionamento ManyToOne com User
  @JoinColumn({ name: 'user_id' }) // Define o nome da coluna de chave estrangeira
  user!: User;
}

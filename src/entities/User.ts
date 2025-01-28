import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('author')
export default class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books' })
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: 'Неизвестно' })
  description: string;

  @Column()
  price: number;

  @Column({ default: 'Неизвестно' })
  author: string;

  @Column({ default: null })
  year: number;

  @Column({ default: false })
  isReader: boolean;
}

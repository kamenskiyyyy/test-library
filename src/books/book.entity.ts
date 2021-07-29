import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../users/user.entity';

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

  @OneToMany(() => UserEntity, (user) => user.purchasedBooks)
  reader: UserEntity;
}

import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
@ObjectType()
export class BookEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => Int)
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.books)
  @Field(() => UserEntity)
  user: UserEntity;
}

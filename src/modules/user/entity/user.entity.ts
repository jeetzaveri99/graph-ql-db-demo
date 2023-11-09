import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';

import { UserRoles } from '../user.enums';

import { BookEntity } from '../../../modules/book/entity/book.entity';

@Entity('users')
@ObjectType()
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  @Field({ defaultValue: UserRoles.USER })
  role: UserRoles;

  @OneToMany(() => BookEntity, (book) => book.user)
  @Field(() => [BookEntity], { nullable: true })
  books?: BookEntity[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = bcrypt.hashSync(password || this.password, salt);
  }
}

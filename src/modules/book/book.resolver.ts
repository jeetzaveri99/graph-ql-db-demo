import {
  Resolver,
  Query,
  Args,
  Mutation,
  Int,
  Parent,
  ResolveField,
  Context,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { BookEntity } from './entity/book.entity';

import { BookService } from './book.service';

import { AddBookArgs } from './args/addBook.args';
import { UpdateBookArgs } from './args/updateBook.args';

import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { UserEntity } from '../user/entity/user.entity';

@Resolver(() => BookEntity)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [BookEntity], { name: 'books' })
  @UseGuards(JwtAuthGuard)
  async getAllBooks() {
    return await this.bookService.findAllBooks();
  }

  @Query(() => BookEntity, { name: 'bookById', nullable: true })
  @UseGuards(JwtAuthGuard)
  async getBookById(@Args({ name: 'bookId', type: () => Int }) id: number) {
    return await this.bookService.findBookById(id);
  }

  @Mutation(() => String, { name: 'deleteBook' })
  @UseGuards(JwtAuthGuard)
  async deleteBookById(
    @Args({ name: 'bookId', type: () => Int }) id: number,
    @Context() ctx,
  ) {
    const {
      req: { user },
    } = ctx;
    return await this.bookService.deleteBook(id, user);
  }

  @Mutation(() => String, { name: 'addBook' })
  @UseGuards(JwtAuthGuard)
  async addBook(@Args('addBookArgs') addBookArgs: AddBookArgs, @Context() ctx) {
    const {
      req: { user },
    } = ctx;

    return await this.bookService.addBook(addBookArgs, user);
  }

  @Mutation(() => String, { name: 'updateBook' })
  @UseGuards(JwtAuthGuard)
  async updateBook(
    @Args('updateBookArgs') updateBookArgs: UpdateBookArgs,
    @Context() ctx,
  ) {
    const {
      req: { user },
    } = ctx;
    return await this.bookService.updateBook(updateBookArgs, user);
  }

  @ResolveField(() => UserEntity)
  async user(@Parent() book: BookEntity): Promise<UserEntity> {
    return await this.bookService.getUser(book.userId);
  }
}

import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Book } from './schema/book.schema';

import { BookService } from './book.service';

import { AddBookArgs } from './args/addBook.args';
import { UpdateBookArgs } from './args/updateBook.args';

import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book], { name: 'books' })
  @UseGuards(JwtAuthGuard)
  async getAllBooks() {
    return await this.bookService.findAllBooks();
  }

  @Query(() => Book, { name: 'bookById', nullable: true })
  @UseGuards(JwtAuthGuard)
  async getBookById(@Args({ name: 'bookId', type: () => Int }) id: number) {
    return await this.bookService.findBookById(id);
  }

  @Mutation(() => String, { name: 'deleteBook' })
  @UseGuards(JwtAuthGuard)
  async deleteBookById(@Args({ name: 'bookId', type: () => Int }) id: number) {
    return await this.bookService.deleteBook(id);
  }

  @Mutation(() => String, { name: 'addBook' })
  @UseGuards(JwtAuthGuard)
  async addBook(@Args('addBookArgs') addBookArgs: AddBookArgs) {
    return await this.bookService.addBook(addBookArgs);
  }

  @Mutation(() => String, { name: 'updateBook' })
  @UseGuards(JwtAuthGuard)
  async updateBook(@Args('updateBookArgs') updateBookArgs: UpdateBookArgs) {
    return await this.bookService.updateBook(updateBookArgs);
  }
}

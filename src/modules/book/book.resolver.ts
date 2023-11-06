import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';

import { Book } from './schema/book.schema';

import { BookService } from './book.service';

import { AddBookArgs } from './args/addBook.args';
import { UpdateBookArgs } from './args/updateBook.args';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book], { name: 'books' })
  async getAllBooks() {
    return await this.bookService.findAllBooks();
  }

  @Query(() => Book, { name: 'bookById', nullable: true })
  async getBookById(@Args({ name: 'bookId', type: () => Int }) id: number) {
    return await this.bookService.findBookById(id);
  }

  @Mutation(() => String, { name: 'deleteBook' })
  async deleteBookById(@Args({ name: 'bookId', type: () => Int }) id: number) {
    return await this.bookService.deleteBook(id);
  }

  @Mutation(() => String, { name: 'addBook' })
  async addBook(@Args('addBookArgs') addBookArgs: AddBookArgs) {
    return await this.bookService.addBook(addBookArgs);
  }

  @Mutation(() => String, { name: 'updateBook' })
  async updateBook(@Args('updateBookArgs') updateBookArgs: UpdateBookArgs) {
    return await this.bookService.updateBook(updateBookArgs);
  }
}

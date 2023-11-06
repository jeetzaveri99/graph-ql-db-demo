import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BookEntity } from './entity/book.entity';

import { AddBookArgs } from './args/addBook.args';
import { UpdateBookArgs } from './args/updateBook.args';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    public readonly bookRepo: Repository<BookEntity>,
  ) {}

  async addBook(addBookArgs: AddBookArgs): Promise<string> {
    const book: BookEntity = new BookEntity();
    book.title = addBookArgs.title;
    book.price = addBookArgs.price;

    await this.bookRepo.save(book);
    return 'Book Added Successfully.';
  }

  async updateBook(updateBookArgs: UpdateBookArgs): Promise<string> {
    const book: BookEntity = await this.bookRepo.findOne({
      where: { id: updateBookArgs.id },
    });

    if (!book) {
      return 'Book is not found with given ID.';
    }

    book.title = updateBookArgs.title;
    book.price = updateBookArgs.price;

    await this.bookRepo.save(book);
    return 'Book Updated Successfully.';
  }

  async deleteBook(id: number): Promise<string> {
    const book: BookEntity = await this.bookRepo.findOne({
      where: { id },
    });

    if (!book) {
      return 'Book is not found with given ID.';
    }

    await this.bookRepo.delete(id);
    return 'Book Deleted Successfully.';
  }

  async findBookById(id: number): Promise<BookEntity> {
    return await this.bookRepo.findOne({ where: { id } });
  }

  async findAllBooks(): Promise<BookEntity[]> {
    return await this.bookRepo.find();
  }
}

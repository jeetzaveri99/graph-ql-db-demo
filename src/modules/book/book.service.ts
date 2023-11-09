import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BookEntity } from './entity/book.entity';

import { AddBookArgs } from './args/addBook.args';
import { UpdateBookArgs } from './args/updateBook.args';

import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    public readonly bookRepo: Repository<BookEntity>,
    public readonly userService: UserService,
  ) {}

  async addBook(addBookArgs: AddBookArgs, user: UserEntity): Promise<string> {
    const book: BookEntity = new BookEntity();
    book.title = addBookArgs.title;
    book.price = addBookArgs.price;
    book.userId = user.id;

    await this.bookRepo.save(book);
    return 'Book Added Successfully.';
  }

  async updateBook(
    updateBookArgs: UpdateBookArgs,
    user: UserEntity,
  ): Promise<string> {
    const book: BookEntity = await this.bookRepo.findOne({
      where: { id: updateBookArgs.id, userId: user.id },
    });

    if (!book) {
      return 'Book is not found with given ID.';
    }

    book.title = updateBookArgs.title;
    book.price = updateBookArgs.price;

    await this.bookRepo.save(book);
    return 'Book Updated Successfully.';
  }

  async deleteBook(id: number, user: UserEntity): Promise<string> {
    const book: BookEntity = await this.bookRepo.findOne({
      where: { id, userId: user.id },
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

  async getUser(userId: number): Promise<UserEntity> {
    return await this.userService.findOneById(userId);
  }
}

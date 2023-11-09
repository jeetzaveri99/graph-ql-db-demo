import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookEntity } from './entity/book.entity';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity]), UserModule],
  controllers: [],
  providers: [BookService, BookResolver],
})
export class BookModule {}

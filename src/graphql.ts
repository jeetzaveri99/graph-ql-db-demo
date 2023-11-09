
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AddBookArgs {
    title: string;
    price: number;
}

export interface UpdateBookArgs {
    id: number;
    title: string;
    price: number;
}

export interface LoginUserInput {
    email: string;
    password: string;
}

export interface RegistrationArgs {
    name: string;
    email: string;
    password: string;
}

export interface UserEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    books?: Nullable<BookEntity[]>;
}

export interface BookEntity {
    id: string;
    title: string;
    price: number;
    userId: number;
    user: UserEntity;
}

export interface LoginResponse {
    access_token: string;
}

export interface IQuery {
    index(): string | Promise<string>;
    books(): BookEntity[] | Promise<BookEntity[]>;
    bookById(bookId: number): Nullable<BookEntity> | Promise<Nullable<BookEntity>>;
}

export interface IMutation {
    deleteBook(bookId: number): string | Promise<string>;
    addBook(addBookArgs: AddBookArgs): string | Promise<string>;
    updateBook(updateBookArgs: UpdateBookArgs): string | Promise<string>;
    login(loginUserInput: LoginUserInput): LoginResponse | Promise<LoginResponse>;
    register(registrationArgs: RegistrationArgs): string | Promise<string>;
}

type Nullable<T> = T | null;

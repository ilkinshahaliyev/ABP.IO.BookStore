import type { AuditedEntityDto } from '@abp/ng.core';
import type { BookType } from './book-type.enum';

export interface BookDto extends AuditedEntityDto<string> {
  name?: string;
  bookType: BookType;
  publishDate?: string;
  price: number;
}

export interface CreateBookDto {
  name: string;
  bookType: BookType;
  publishDate: string;
  price: number;
}

export interface UpdateBookDto {
  name: string;
  bookType: BookType;
  publishDate: string;
  price: number;
}

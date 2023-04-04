import { bookTypeOptions } from './../proxy/books/book-type.enum';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookDto, BookService } from '@proxy/books';

import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class BookComponent implements OnInit {
  books = { items: [], totalCount: 0 } as PagedResultDto<BookDto>;

  selectedBook = {} as BookDto;

  form: FormGroup;

  bookTypes = bookTypeOptions;

  isModalOpen = false;

  constructor(
    public readonly listService: ListService,
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    const bookStreamCreator = query => this.bookService.getList(query);

    this.listService.hookToQuery(bookStreamCreator).subscribe(response => {
      this.books = response;
    });
  }

  createBook() {
    this.selectedBook = {} as BookDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editBook(id: string) {
    this.bookService.get(id).subscribe(book => {
      this.selectedBook = book;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  deleteBook(id: string) {
    this.confirmationService.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
      if (status == Confirmation.Status.confirm) {
        this.bookService.delete(id).subscribe(() => this.listService.get());
      }
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: [this.selectedBook.name || '', Validators.required],
      bookType: [this.selectedBook.bookType || null, Validators.required],
      publishDate: [
        this.selectedBook.publishDate ? new Date(this.selectedBook.publishDate) : null,
        Validators.required,
      ],
      price: [this.selectedBook.price || null, Validators.required],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedBook.id
      ? this.bookService.update(this.selectedBook.id, this.form.value)
      : this.bookService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.listService.get();
    });
  }
}

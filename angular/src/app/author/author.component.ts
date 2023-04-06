import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { AuthorDto, AuthorService } from '@proxy/authors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { query } from '@angular/animations';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class AuthorComponent implements OnInit {
  author = { items: [], totalCount: 0 } as PagedResultDto<AuthorDto>;

  isModalOpen = false;

  form: FormGroup;

  selectedAuthor = {} as AuthorDto;

  constructor(
    public readonly listService: ListService,
    private authorService: AuthorService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    const authorStreamCreator = query => this.authorService.getList(query);

    this.listService.hookToQuery(authorStreamCreator).subscribe(response => {
      this.author = response;
    });
  }

  createAuthor() {
    this.selectedAuthor = {} as AuthorDto;

    this.buildForm();

    this.isModalOpen = true;
  }

  editAuthor(id: string) {
    this.authorService.get(id).subscribe(author => {
      this.selectedAuthor = author;

      this.buildForm();

      this.isModalOpen = true;
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: [this.selectedAuthor.name || '', Validators.required],
      birthDate: [
        this.selectedAuthor.birthDate ? new Date(this.selectedAuthor.birthDate) : null,
        Validators.required,
      ],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    if (this.selectedAuthor.id) {
      this.authorService.update(this.selectedAuthor.id, this.form.value).subscribe(() => {
        this.isModalOpen = false;
        this.form.reset();
        this.listService.get();
      });
    } else {
      this.authorService.createAuthorByInput(this.form.value).subscribe(() => {
        this.isModalOpen = false;
        this.form.reset();
        this.listService.get();
      });
    }
  }

  delete(id: string) {
    this.confirmationService.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        this.authorService.delete(id).subscribe(() => this.listService.get());
      }
    });
  }
}

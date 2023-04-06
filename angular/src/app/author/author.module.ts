import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorComponent } from './author.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthorComponent],
  imports: [CommonModule, AuthorRoutingModule, SharedModule, NgbDatepickerModule],
})
export class AuthorModule {}

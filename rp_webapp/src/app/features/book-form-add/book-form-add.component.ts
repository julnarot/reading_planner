import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Book } from '../books/books.component';
import { IForm } from '../../core/utils/rp-types';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  BOOK_CATEGORIES,
} from '../../core/utils/constants';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../books/services/book.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-book-form-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './book-form-add.component.html',
  styleUrl: './book-form-add.component.scss',
})
export class BookFormAddComponent {
  bookForm: FormGroup;
  bookCategories: string[] = BOOK_CATEGORIES;
  constructor(
    private readonly fb: FormBuilder,
    private readonly service: BookService,
    private readonly dialogRef: MatDialogRef<BookFormAddComponent>
  ) {
    this.bookForm = this.fb.group<IForm<Book>>({
      title: new FormControl('', { validators: Validators.required }),
      category: new FormControl(
        BOOK_CATEGORIES[BOOK_CATEGORIES.length - 1],
        Validators.required
      ),
      author: new FormControl(),
      epilogue: new FormControl(),
      numPages: new FormControl(),
    });
  }
  onSave() {
    if (this.bookForm.valid) {
      this.service.addApi$(this.bookForm.value).subscribe((book) => {
        this.service.addBook(book);
        this.dialogRef.close();
      });
    }
  }
}

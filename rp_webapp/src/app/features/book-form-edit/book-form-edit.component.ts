import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BOOK_CATEGORIES } from '../../core/utils/constants';
import { BookService } from '../books/services/book.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../books/books.component';
import { IForm } from '../../core/utils/rp-types';

@Component({
  selector: 'app-book-form-edit',
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
  templateUrl: './book-form-edit.component.html',
  styleUrl: './book-form-edit.component.scss',
})
export class BookFormEditComponent implements OnInit {
  bookForm: FormGroup;
  bookCategories: string[] = BOOK_CATEGORIES;
  constructor(
    private readonly fb: FormBuilder,
    private readonly service: BookService,
    private readonly dialogRef: MatDialogRef<BookFormEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) {
    this.bookForm = this.fb.group<IForm<Book>>({
      title: new FormControl('', { validators: Validators.required }),
      category: new FormControl('', Validators.required),
      author: new FormControl(),
      epilogue: new FormControl(),
      numPages: new FormControl(),
      coverImageUrl: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.bookForm.patchValue(this.data);
  }

  onSave() {
    if (this.bookForm.valid) {
      const value: Book = this.bookForm.value;
      if (!value.coverImageUrl?.includes('http')) {
        value.coverImageUrl = '';
      }

      this.service
        .updateApi$(this.data.id, this.bookForm.value)
        .subscribe((book) => {
          this.service.updateBook(book);
          this.dialogRef.close();
        });
    }
  }
}

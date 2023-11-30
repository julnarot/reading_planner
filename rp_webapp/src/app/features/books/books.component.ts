import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { BookService } from './services/book.service';
import { HttpClientModule } from '@angular/common/http';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { BookFormAddComponent } from '../book-form-add/book-form-add.component';

export interface Book {
  title: string;
  category: string;
  subtitle?: string;
  abstract?: string;
  numPages?: number;
  coverImage?: string;
}

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    HttpClientModule,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent {
  books: Observable<Book[]> = this.bookService.getBooks$;
  categories$: Observable<string[]> = this.bookService.getBooksCategories$;

  constructor(
    private readonly bookService: BookService,
    public dialog: MatDialog
    ) {}
  addBook() {
     this.dialog.open(BookFormAddComponent, {
      data: {},
    });
  }
}

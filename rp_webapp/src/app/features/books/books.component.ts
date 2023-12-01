import { Component, OnInit } from '@angular/core';
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
} from '@angular/material/dialog';
import { BookFormAddComponent } from '../book-form-add/book-form-add.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

export interface Book {
  title: string;
  category: string;
  author?: string;
  epilogue?: string;
  numPages?: number;
  coverImageUrl?: string;
}

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    RouterLink
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  books: Observable<Book[]> = this.bookService.getBooks$;


  constructor(
    private readonly bookService: BookService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.bookService.getAllApi$().subscribe((books) => {
      this.bookService.setBooks(books);
    });
  }
  addBook() {
    this.dialog.open(BookFormAddComponent, {
      data: {},
    });
  }
}

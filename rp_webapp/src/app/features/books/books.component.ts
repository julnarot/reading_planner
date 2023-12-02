import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BookService } from './services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { BookFormAddComponent } from '../book-form-add/book-form-add.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BookFormEditComponent } from '../book-form-edit/book-form-edit.component';
import { DEFAULT_COVER_IMAGE_URL } from '../../core/utils/constants';

export interface Book {
  id: number;
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
    RouterLink,
    MatMenuModule,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit, OnDestroy {
  books: Observable<Book[]> = this.bookService.getBooks$;
  unsubscribe: Subject<void> = new Subject();
  defCoverUrlImg = DEFAULT_COVER_IMAGE_URL;
  constructor(
    private readonly bookService: BookService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.bookService
      .getAllApi$()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((books) => {
        this.bookService.setBooks(books);
      });
  }
  addBook() {
    this.dialog.open(BookFormAddComponent, {
      data: {},
    });
  }

  onDelete(book: Book): void {
    if (confirm(`Are you sure you want to delete ${book.title}?`)) {
      this.bookService
        .deleteApi$(book.id)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(() => {
          this.bookService.deleteBook(book);
        });
    }
  }

  onUpdate(book: Book): void {
    this.dialog.open(BookFormEditComponent, {
      data: book,
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

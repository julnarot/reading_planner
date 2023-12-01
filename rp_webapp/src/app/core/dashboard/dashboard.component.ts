import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BookService } from '../../features/books/services/book.service';
import { Observable } from 'rxjs';
import { Book } from '../../features/books/books.component';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  books$: Observable<Book[]> = this.bookService.getBooks$;
  book?: Book | unknown = null;
  constructor(private readonly bookService: BookService) {}
  ngOnInit() {
    this.bookService.getAllApi$().subscribe((books) => {
      this.bookService.setBooks(books);
    });
  }
  onSelectBook(b: Book) {
    this.book = b;
  }
}

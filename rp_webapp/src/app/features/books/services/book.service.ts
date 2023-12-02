import { Injectable } from '@angular/core';
import { Book } from '../books.component';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AbstractRestService } from '../../../core/utils/abstract-rest-service';

@Injectable({
  providedIn: 'root',
})
export class BookService extends AbstractRestService<Book> {
  baseUrl = 'http://localhost:8080/';
  private readonly books$$: BehaviorSubject<Book[]> = new BehaviorSubject<
    Book[]
  >([]);
  public getBooks$: Observable<Book[]> = this.books$$.asObservable();
  public setBooks = (books: Book[]): void => this.books$$.next(books);
  public getBooksCategories$: Observable<string[]> = this.getBooks$.pipe(
    map((books) => books.map((b) => b.category))
  );

  constructor(http: HttpClient) {
    super(http, 'http://localhost:8080/books');
  }

  getAllByCategory(category: string): Observable<Book[]> {
    return this.getBooks$.pipe(
      map((books) => books.filter((b) => b.category === category))
    );
  }
  addBook(book: any): void {
    this.setBooks([...this.books$$.value, book]);
  }

  deleteBook(book: any): void {
    this.setBooks(this.books$$.value.filter((b) => b !== book));
  }
}

import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export abstract class AbstractRestService<T> {
  constructor(protected _http: HttpClient, protected url: string) {}

  getAllApi$(): Observable<T[]> {
    return this._http.get(this.url).pipe(map((resp) => resp as T[]));
  }
  getByIdApi$(id: number): Observable<T> {
    return this._http
      .get(`${this.url}${id}`)
      .pipe(map((resp) => resp as T));
  }
  addApi$(id: number): Observable<T> {
    return this._http
      .get(`${this.url}${id}`)
      .pipe(map((resp) => resp as T));
  }
}
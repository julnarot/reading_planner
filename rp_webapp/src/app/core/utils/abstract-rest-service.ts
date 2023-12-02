import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export abstract class AbstractRestService<T> {
  constructor(protected _http: HttpClient, protected url: string) {}

  getAllApi$(): Observable<T[]> {
    return this._http.get(this.url).pipe(map((resp) => resp as T[]));
  }
  getByIdApi$(id: number): Observable<T> {
    return this._http.get(`${this.url}${id}`).pipe(map((resp) => resp as T));
  }
  addApi$(instance: T): Observable<T> {
    return this._http
      .post(`${this.url}`, instance)
      .pipe(map((resp) => resp as T));
  }
  deleteApi$(id: number): Observable<T> {
    return this._http
      .delete(`${this.url}/${id}`)
      .pipe(map((resp) => resp as T));
  }
}

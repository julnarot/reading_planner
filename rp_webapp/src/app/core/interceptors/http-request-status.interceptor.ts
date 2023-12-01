import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { HttpRequestStatus } from '../models/http-request-status';
import { MatSnackBar } from '@angular/material/snack-bar';

export const httpRequestStatusInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    tap(
      (success) => {
        if (success instanceof HttpResponse) {
          switch (success.status) {
            case HttpRequestStatus.Created:
              snackBar.open('success');
              break;
          }
        }
      },
      (exception) => {
        if (exception instanceof HttpErrorResponse) {
          switch (exception.status) {
            case HttpRequestStatus.NotFound:
              snackBar.open('Resource not found');
              break;
          }
        }
      }
    )
  );
};

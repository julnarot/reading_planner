import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { HttpRequestStatus } from '../models/http-request-status';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBARTIMEOUT } from '../utils/constants';

export const httpRequestStatusInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  const snackBarConf = {
    duration: SNACKBARTIMEOUT,
  };

  return next(req).pipe(
    tap(
      (success) => {
        if (success instanceof HttpResponse) {
          switch (success.status) {
            case HttpRequestStatus.Created:
              snackBar.open(`🟢 ${success.statusText}`, '', snackBarConf);
              break;
          }
        }
      },
      (exception) => {
        if (exception instanceof HttpErrorResponse) {
          switch (exception.status) {
            case HttpRequestStatus.NotFound:
              snackBar.open(`🔴 ${exception.message}`, '', snackBarConf);
              break;
          }
        }
      }
    ),
  );
};

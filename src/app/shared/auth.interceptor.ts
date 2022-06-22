import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../admin/shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.isAuth()) {
      req = req.clone({
        setParams: {
          auth: this.auth.token!,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e.status === 401) {
          this.auth.logout();
          this.router.navigate(['/admin', 'login'], {
            queryParams: { authFailed: true },
          });
        }
        return throwError(() => e);
      })
    );
  }
}

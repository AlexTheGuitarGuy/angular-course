import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FirebaseAuthResponse, User } from 'src/app/shared/interfaces';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private injector: Injector) {}

  get token(): string | null {
    const expDate = new Date(localStorage.getItem('fb-token-exp-date')!);
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<any> {
    const http = this.injector.get(HttpClient);

    user.returnSecureToken = true;
    return http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(
        tap((r) => AuthService.setToken(r as FirebaseAuthResponse)),
        catchError((e) => this.handleError(e))
      );
  }

  logout() {
    AuthService.setToken(null);
  }

  handleError(e: HttpErrorResponse) {
    const { message } = e.error.error;

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email has not been found.');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Email is invalid.');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Password is invalid.');
        break;
      default:
        this.error$.next('An error has occurred.');
    }

    return throwError(() => e);
  }

  isAuth(): boolean {
    return !!this.token;
  }

  private static setToken(response: FirebaseAuthResponse | null) {
    if (response) {
      const { idToken, expiresIn } = response;
      const expDate = new Date(new Date().getTime() + +expiresIn * 1000);

      localStorage.setItem('fb-token', idToken);
      localStorage.setItem('fb-token-exp-date', expDate.toString());
    } else localStorage.clear();
  }
}

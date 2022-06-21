import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirebaseAuthResponse, User } from 'src/app/shared/interfaces';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
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
      .pipe(tap((r) => AuthService.setToken(r as FirebaseAuthResponse)));
  }

  logout() {
    AuthService.setToken(null);
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

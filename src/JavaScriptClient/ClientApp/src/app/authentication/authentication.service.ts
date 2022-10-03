import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface UserClaim {
  type: string;
  value: string;
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  login() {
    window.location.href = "/bff/login";
  }

  logout(logoutUrl: string) {
  }

  getUserData() {
    return this.http.get<UserClaim[]>("/bff/user").pipe(
      catchError(this.handleError)
    );
  }

  get isLoggedIn(): boolean {
    let isLogged = false;
    let headers: any;
    let response: UserClaim[];
    this.getUserData()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        response = { ...resp.body! };
      });
    return this.isLoggedIn;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

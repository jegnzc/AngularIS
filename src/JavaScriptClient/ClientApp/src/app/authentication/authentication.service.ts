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
    return this.http.get("/bff/user", { observe: 'response' })
    //.pipe(
    //  //catchError(this.handleError) // then handle the error a
    //);
  }

  get isLoggedIn(): boolean {
    let status: boolean;
    status = false;
    this.getUserData().subscribe((data: any) => console.log(data));

    return status;
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

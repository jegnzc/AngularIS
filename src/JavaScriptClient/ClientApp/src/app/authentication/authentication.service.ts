import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { UserClaimKeys } from '../../services/claim-keys';
import { BffKeys } from '../../services/bff-keys';
import { User } from '../../models/user.model';

export interface UserClaim {
  type: string;
  value: string;
}
const httpOptions = {
  headers: new HttpHeaders({
    'X-CSRF': '1',
  })
};

@Injectable()
export class AuthService {
  userClaims: UserClaim[] = [];
  constructor(private http: HttpClient) { }

  login() {
    window.location.href = BffKeys.LOGIN;
  }

  getUserData(): Observable<UserClaim[]> {
    return this.http.get<UserClaim[]>(BffKeys.USER, httpOptions);
  }

  logout() {
    if (this.userClaims) {
      window.location.href = this.userClaims.find(x => x.type == UserClaimKeys.LOGOUT_URL)?.value!;
    } else {
      window.location.href = BffKeys.LOGOUT;
    }
  }

  get currentUser(): User {
    this.getUserData().subscribe(response => {
      console.log(response);
      this.userClaims = response;
    },
      err => console.error(err)
    );
    const user = new User(
      this.userClaims.find(x => x.type == UserClaimKeys.SUB)?.value!,
      this.userClaims.find(x => x.type == UserClaimKeys.PREFERRED_USERNAME)?.value!,
      this.userClaims.find(x => x.type == UserClaimKeys.EMAIL)?.value!,
      this.userClaims.find(x => x.type == UserClaimKeys.ROLE)?.value!
    );

    return user;
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

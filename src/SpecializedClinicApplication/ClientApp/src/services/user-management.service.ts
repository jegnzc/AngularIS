import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, map, throwError, catchError } from 'rxjs';
import { AddUser, UpdateUser, User } from '../models/user.model';
import { LocalService } from '../services/local.service';
import { LocalKeys } from './local-keys';
import { UrlKeys } from './url-keys';
import { UserClaimKeys } from './claim-keys';

export interface UserClaim {
  type: string;
  value: string;
}

@Injectable()
export class UserManagementService {
  userId!: string;
  constructor(private http: HttpClient, private local: LocalService) {
    this.getLocalUserData();
  }

  getLocalUserData(): User {
    let claims = this.local.getJsonData<UserClaim[]>(LocalKeys.USER);
    return new User(
      claims.find(x => x.type == UserClaimKeys.SUB)?.value!,
      claims.find(x => x.type == UserClaimKeys.PREFERRED_USERNAME)?.value!,
      claims.find(x => x.type == UserClaimKeys.EMAIL)?.value!,
      claims.find(x => x.type == UserClaimKeys.ROLE)?.value!
    );
  }

  patchUser(patchUser: UpdateUser): Observable<any> {
    return this.http.patch(UrlKeys.REMOTE + "/" + patchUser.id, patchUser);
  }

  addUser(user: AddUser): Observable<any> {
    return this.http.post(UrlKeys.REMOTE, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(UrlKeys.REMOTE + "/" + id);
  }

  getCurrentUser(): Observable<User> {
    this.userId = this.getLocalUserData().id!
    return this.http.get<User>(UrlKeys.REMOTE + "/" + this.userId);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(UrlKeys.REMOTE + "/" + id);
  }

  getAllUsers(): Observable<User[]> {
    this.userId = this.getLocalUserData().id!
    return this.http.get<User[]>(UrlKeys.REMOTE);
  }
}

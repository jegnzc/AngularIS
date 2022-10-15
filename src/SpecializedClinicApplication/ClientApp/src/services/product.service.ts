import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, map, throwError, catchError } from 'rxjs';
import { AddUser, UpdateUser, User } from '../models/user.model';
import { LocalService } from './local.service';
import { LocalKeys } from './local-keys';
import { UrlKeys } from './url-keys';
import { UserClaimKeys } from './claim-keys';
import { AddProduct } from '../models/product.model';

@Injectable()
export class ProductService {
  userId!: string;
  constructor(
    private http: HttpClient,
    private local: LocalService
  ) {
  }

  patchProduct(patchUser: UpdateUser): Observable<any> {
    return this.http.patch(UrlKeys.PRODUCT + "/" + patchUser.id, patchUser);
  }

  addProduct(product: AddProduct): Observable<any> {
    return this.http.post(UrlKeys.PRODUCT, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(UrlKeys.PRODUCT + "/" + id);
  }

  getProduct(id: string): Observable<User> {
    return this.http.get<User>(UrlKeys.PRODUCT + "/" + id);
  }

  getAllProducts(): Observable<User[]> {
    return this.http.get<User[]>(UrlKeys.PRODUCT);
  }
}

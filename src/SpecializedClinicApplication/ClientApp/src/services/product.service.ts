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
import { Product } from '../models/product.model';

@Injectable()
export class ProductService {

  constructor(
    private http: HttpClient
  ) {
  }

  patchProduct(patchUser: Product): Observable<any> {
    return this.http.patch(UrlKeys.PRODUCT + "/" + patchUser.id, patchUser);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post(UrlKeys.PRODUCT, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(UrlKeys.PRODUCT + "/" + id);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(UrlKeys.PRODUCT + "/" + id);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(UrlKeys.PRODUCT);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError, catchError } from 'rxjs';
import { UrlKeys } from './url-keys';
import { Service } from '../models/service.model';

@Injectable()
export class ServiceManagementService {
  constructor(private http: HttpClient) {
  }

  patchService(service: Service): Observable<any> {
    return this.http.patch(UrlKeys.SERVICE + "/" + service.id, service);
  }

  addService(service: Service): Observable<Service> {
    return this.http.post(UrlKeys.SERVICE, service);
  }

  deleteService(id: number): Observable<any> {
    return this.http.delete(UrlKeys.SERVICE + "/" + id);
  }

  getService(id: number): Observable<Service> {
    return this.http.get<Service>(UrlKeys.SERVICE + "/" + id);
  }

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(UrlKeys.SERVICE);
  }
}

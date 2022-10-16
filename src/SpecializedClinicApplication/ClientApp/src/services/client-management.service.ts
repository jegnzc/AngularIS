import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError, catchError } from 'rxjs';
import { UrlKeys } from './url-keys';
import { Client } from '../models/client.model';

@Injectable()
export class ClientManagementService {
  constructor(private http: HttpClient) {
  }

  patchClient(client: Client): Observable<any> {
    return this.http.patch(UrlKeys.REMOTE + "/" + client.id, client);
  }

  addClient(client: Client): Observable<any> {
    return this.http.post(UrlKeys.REMOTE, client);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(UrlKeys.REMOTE + "/" + id);
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(UrlKeys.REMOTE + "/" + id);
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(UrlKeys.REMOTE);
  }
}

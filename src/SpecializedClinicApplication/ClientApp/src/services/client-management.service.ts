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
    return this.http.patch(UrlKeys.CLIENT + "/" + client.id, client);
  }

  addClient(client: Client): Observable<Client>
  {
    return this.http.post(UrlKeys.CLIENT, client);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(UrlKeys.CLIENT + "/" + id);
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(UrlKeys.CLIENT + "/" + id);
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(UrlKeys.CLIENT);
  }
}

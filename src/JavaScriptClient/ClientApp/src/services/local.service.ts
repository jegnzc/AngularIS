import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  constructor(private storageService: StorageService) { }

  setJsonValue(key: string, value: any) {
    this.storageService.secureStorage.setItem(key, value);
  }
  // Get the json value from local storage
  getJsonValue(key: string) {
    return this.storageService.secureStorage.getItem(key);
  }

  // Clear the local storage
  clearToken() {
    return this.storageService.secureStorage.clear();
  }

  setLocal(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  getLocal(key: string) {
    return localStorage.getItem(key);
  }

  clearLocal() {
    localStorage.clear();
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class UrlKeys {
  public static readonly REMOTE = '/remote/user';
  public static readonly PRODUCT = '/api/product';
  public static readonly CLIENT = '/api/client';
  public static readonly INVENTORY = '/api/inventory';
  public static readonly SERVICE = '/api/service';
}

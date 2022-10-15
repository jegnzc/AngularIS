import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/authentication.service';
import { LocalService } from '../../services/local.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private local: LocalService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.currentUser.role == "Administrador" ? true : false;
  }
  
}

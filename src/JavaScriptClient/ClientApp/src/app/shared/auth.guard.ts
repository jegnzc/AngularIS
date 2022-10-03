import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, UserClaim } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  userClaims: UserClaim[] = [];
  error: any;

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.getUserData().subscribe((response) => {
      let test = response;
      if (this.userClaims.length > 0) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    });
    return false;
  }
}

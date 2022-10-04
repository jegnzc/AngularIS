import { Component } from '@angular/core';
import { AuthService } from '../authentication/authentication.service';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  userName: string = null;

  constructor(private authService: AuthService) {
  }

  get userName(): string {
    if (this.userName == null) {
      return this.authService.currentUser.userName ?? "";
    }
    return this.userName;
  }
}

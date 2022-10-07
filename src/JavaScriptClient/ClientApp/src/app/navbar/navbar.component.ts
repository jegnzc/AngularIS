import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/authentication.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { UserClaimKeys } from '../../services/claim-keys';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$: Observable<User> = new Observable<User>();

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.user$ = this.auth.getUser();
  }
}

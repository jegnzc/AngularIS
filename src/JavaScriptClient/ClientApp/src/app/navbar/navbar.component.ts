import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/authentication.service';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User = new User();

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.auth.currentUser;
  }
}

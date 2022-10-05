import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication.service';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userName: string | undefined;

  constructor(private local: LocalService) {
  }
  // local storage
  // local.service.ts
  // local storage service
  // secure web storage
  ngOnInit(): void {
    this.local.setJsonValue('session', "");
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Test, AuthService } from './authentication/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  error: any;
  userClaims: string = "";
  title = 'ClientApp';

  constructor(private authorize: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authorize.getUserData().subscribe({
      next: (userClaims: any) => console.log(userClaims), // success path
      error: error => this.error = error, // error path
    });
    console.log(this.userClaims);
  }

  logout() {
  }

  login() {
    this.authorize.login();
    //this.authorize.login()
    //  .subscribe({
    //    next: (test: Test) => this.test = { ...test }, // success path
    //    error: error => this.error = error, // error path
    //  }));
  }
}

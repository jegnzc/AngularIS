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
  test: any;
  error: any;
  userClaims: any;
  title = 'ClientApp';

  constructor(private authorize: AuthService, private router: Router) {
  }

  ngOnInit() {
    var req = new Request("/bff/user", {
      headers: new Headers({
        "X-CSRF": "1",
      }),
    });

    try {
      var resp = await fetch(req);
      if (resp.ok) {
        userClaims = await resp.json();

        log("user logged in", userClaims);
      } else if (resp.status === 401) {
        log("user not logged in");
      }
    } catch (e) {
      log("error checking user status");
    }
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

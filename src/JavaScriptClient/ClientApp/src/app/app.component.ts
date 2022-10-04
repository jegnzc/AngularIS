import { Component, OnInit } from '@angular/core';
import { UserClaim, AuthService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  error: any;
  title = 'ClientApp';
  userClaims: UserClaim[] = [];

  constructor(private authorize: AuthService) {
  }

  ngOnInit() {
    //this.authorize.getUserData().subscribe({
    //  next: (userClaims: UserClaim[]) => this.userClaims = userClaims, // success path
    //  error: error => this.error = error, // error path
    //});
  }
}

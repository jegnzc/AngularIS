import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let testing = this.http.get<string>("remote/identity").pipe(
      map(response => {
        console.log("Matenme");
        console.log(response);
      }));

  }

}

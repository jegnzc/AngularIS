import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, map, throwError, catchError } from 'rxjs';

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<string>("remote/user").pipe(
      map(response => {
        console.log("Matenme");
        console.log(response);
      }, catchError(
        (e) => {
          return throwError(() => new Error("Cerote " + e));
        }
      )
      )
    ).subscribe();

  }

}

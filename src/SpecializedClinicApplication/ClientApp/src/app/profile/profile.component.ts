import { Component, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserManagementService } from '../../services/user-management.service';
import { Observable, Subject } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  myForm!: FormGroup;
  user$!: Observable<User>;

  constructor(public fb: FormBuilder, public userService: UserManagementService) { }
  ngOnInit(): void {
    this.user$ = this.userService.getUser(this.userService.getLocalUserData().id!);
    this.reactiveForm();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      userName: [''],
      email: [''],
      rol: [''],
    });
  }

  date(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.myForm.get('dob')?.setValue(convertDate, {
      onlyself: true,
    });
  }

  submitForm() {
    console.log(this.myForm.value);
  }
}

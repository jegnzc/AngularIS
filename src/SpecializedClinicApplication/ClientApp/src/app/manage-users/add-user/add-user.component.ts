import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserEditModel } from '../../../models/user.model';
import { UserManagementService } from '../../../services/user-management.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  myForm!: FormGroup;
  user!: UserEditModel;
  hide = true;

  constructor(
    public fb: FormBuilder,
    public userService: UserManagementService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required]
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
    this.userService.addUser(this.myForm.value).subscribe(res => {
      this.router.navigate(["/user"]);
    });
  }
}

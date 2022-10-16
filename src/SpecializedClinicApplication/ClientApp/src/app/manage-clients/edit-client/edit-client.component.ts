import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserEditModel } from '../../../models/user.model';
import { UserManagementService } from '../../../services/user-management.service';

@Component({
  selector: 'edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  myForm!: FormGroup;
  user!: UserEditModel;

  constructor(
    public fb: FormBuilder,
    public userService: UserManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.userService.getUser(this.route.snapshot.paramMap.get('id')!).subscribe(res => {
      this.user = res;
      this.myForm.patchValue({
        userName: this.user.userName,
        email: this.user.email,
        role: this.user.role
      })
    });
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      role: [null, Validators.required],
    });
  }

  date(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.myForm.get('dob')?.setValue(convertDate, {
      onlyself: true,
    });
  }

  submitForm() {
    let valid = true;
    console.log(this.myForm.value);
    this.myForm.value.id = this.route.snapshot.paramMap.get('id')!;
    Object.keys(this.myForm.controls).forEach(key => {
      // Get errors of every form control
      if (this.myForm.get(key)!.errors != null) {
        valid = false;
      }
    });

    if (valid) {
      this.userService.patchUser(this.myForm.value).subscribe(res => {
        this.router.navigate(["/user"]);
      });
    }
  }

  public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UserEditModel } from '../../../models/user.model';
import { UserManagementService } from '../../../services/user-management.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  myForm!: FormGroup;
  user!: UserEditModel;

  constructor(
    public fb: FormBuilder,
    public userService: UserManagementService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.userService.getUser(parseInt(this.route.snapshot.paramMap.get('id')!)).subscribe(res => {
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
      userName: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
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
    this.myForm.value.id = this.route.snapshot.paramMap.get('id')!;
    this.userService.patchUser(this.myForm.value).subscribe(res => {
      console.log("éxito al actualizar usuario");
    });
  }
}

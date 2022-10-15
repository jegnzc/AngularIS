import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserEditModel } from '../../../models/user.model';
import { ProductService } from '../../../services/product.service';
import { UserManagementService } from '../../../services/user-management.service';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  myForm!: FormGroup;
  user!: UserEditModel;

  constructor(
    public fb: FormBuilder,
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.productService.getUser(this.route.snapshot.paramMap.get('id')!).subscribe(res => {
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
    this.productService.patchUser(this.myForm.value).subscribe(res => {
      this.router.navigate(["/user"]);
    });
  }
}

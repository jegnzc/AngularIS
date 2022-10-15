import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserEditModel } from '../../../models/user.model';
import { ProductService } from '../../../services/product.service';
import { UserManagementService } from '../../../services/user-management.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  myForm!: FormGroup;
  user!: UserEditModel;
  hide = true;

  constructor(
    public fb: FormBuilder,
    public productService: ProductService,
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
    this.productService.addProduct(this.myForm.value).subscribe(res => {
      this.router.navigate(["/product"]);
    });
  }
}

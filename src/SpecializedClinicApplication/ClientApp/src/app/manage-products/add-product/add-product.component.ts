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
      name: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      quantity: [null, Validators.required],
    });
  }

  date(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.myForm.get('dob')?.setValue(convertDate, {
      onlyself: true,
    });
  }

  public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }

  submitForm() {
    let valid = true;
    console.log(this.myForm.value);
    Object.keys(this.myForm.controls).forEach(key => {
      // Get errors of every form control
      if (this.myForm.get(key)!.errors != null) {
        valid = false;
      }
    });

    if (valid) {
      this.productService.addProduct(this.myForm.value).subscribe(res => {
        this.router.navigate(["/product"]);
      });
    }
  }
}

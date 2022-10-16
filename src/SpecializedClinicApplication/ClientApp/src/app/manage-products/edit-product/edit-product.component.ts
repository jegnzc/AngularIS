import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product.model';
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
  product!: Product;

  constructor(
    public fb: FormBuilder,
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.productService.getProduct(parseInt(this.route.snapshot.paramMap.get('id')!)).subscribe(res => {
      this.product = res;
      this.myForm.patchValue({
        name: this.product.name,
        price: this.product.price,
        quantity: this.product.quantity
      })
    });
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
    this.myForm.value.id = this.route.snapshot.paramMap.get('id')!;
    Object.keys(this.myForm.controls).forEach(key => {
      // Get errors of every form control
      if (this.myForm.get(key)!.errors != null) {
        valid = false;
      }
    });

    if (valid) {
      this.productService.patchProduct(this.myForm.value).subscribe(res => {
        this.router.navigate(["/product"]);
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Service } from '../../../models/service.model';
import { ServiceManagementService } from '../../../services/services-management.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  myForm!: FormGroup;
  service!: Service;

  constructor(
    public fb: FormBuilder,
    public serviceService: ServiceManagementService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      name: [null, Validators.required],
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
      this.serviceService.addService(this.myForm.value).subscribe(res => {
        this.router.navigate(["/service"]);
      });
    }
  }

 

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceManagementService } from '../../../services/services-management.service';

@Component({
  selector: 'edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public serviceService: ServiceManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.serviceService.getService(parseInt(this.route.snapshot.paramMap.get('id')!)).subscribe(res => {
      this.myForm.patchValue({
        name: res.name
      })
    });
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
      this.serviceService.patchService(this.myForm.value).subscribe(res => {
        this.router.navigate(["/service"]);
      });
    }
  }

  public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientManagementService } from '../../../services/client-management.service';

@Component({
  selector: 'edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public clientService: ClientManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.clientService.getClient(parseInt(this.route.snapshot.paramMap.get('id')!)).subscribe(res => {
      this.myForm.patchValue({
        name: res.name,
        address: res.address,
        email: res.email,
        phoneNumber: res.phoneNumber
      })
    });
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      name: [null, Validators.required],
      address: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, Validators.required],
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
      this.clientService.patchClient(this.myForm.value).subscribe(res => {
        this.router.navigate(["/client"]);
      });
    }
  }

  public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }
}

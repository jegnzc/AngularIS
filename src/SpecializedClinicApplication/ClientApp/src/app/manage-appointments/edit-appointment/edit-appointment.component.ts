import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from '../../../models/client.model';
import { Service } from '../../../models/service.model';
import { AppointmentManagementService } from '../../../services/appointment-management.service';
import { ClientManagementService } from '../../../services/client-management.service';
import { ServiceManagementService } from '../../../services/services-management.service';

@Component({
  selector: 'edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss']
})
export class EditAppointmentComponent implements OnInit {
  myForm!: FormGroup;
  clients$: Observable<Client[]> = new Observable<Client[]>();
  services$: Observable<Service[]> = new Observable<Service[]>();

  constructor(
    public fb: FormBuilder,
    public appointmentService: AppointmentManagementService,
    public clientService: ClientManagementService,
    public serviceService: ServiceManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.clients$ = this.clientService.getAllClients();
    this.services$ = this.serviceService.getAllServices();

    this.appointmentService.getAppointment(parseInt(this.route.snapshot.paramMap.get('id')!)).subscribe(res => {
      this.myForm.patchValue({
        reason: res.reason,
        clientId: res.clientId,
        serviceId: res.serviceId,
        date: res.date,
      })
    });
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      reason: [null, Validators.required],
      clientId: [null, Validators.required],
      serviceId: [null, Validators.required],
      date: [null, Validators.required],
    });
  }

  date(e) {
    var convertDate = new Date(e.target.value);
    let convertedDate = convertDate.toJSON();
    this.myForm.get('date')?.setValue(convertedDate, {
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
      this.appointmentService.patchAppointment(this.myForm.value).subscribe(res => {
        this.router.navigate(["/appointment"]);
      });
    }
  }

  public myError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }
}

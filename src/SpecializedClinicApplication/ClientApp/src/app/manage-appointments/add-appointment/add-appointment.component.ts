import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { Appointment } from '../../../models/appointment.model';
import { Client } from '../../../models/client.model';
import { Service } from '../../../models/service.model';
import { AppointmentManagementService } from '../../../services/appointment-management.service';
import { ClientManagementService } from '../../../services/client-management.service';
import { ServiceManagementService } from '../../../services/services-management.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {
  myForm!: FormGroup;
  appointment!: Appointment;
  clients$: Observable<Client[]> = new Observable<Client[]>();
  services$: Observable<Service[]> = new Observable<Service[]>();
  constructor(
    public fb: FormBuilder,
    public appointmentService: AppointmentManagementService,
    public clientService: ClientManagementService,
    public serviceService: ServiceManagementService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.clients$ = this.clientService.getAllClients();
    this.services$ = this.serviceService.getAllServices();
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
      this.appointmentService.addAppointment(this.myForm.value).subscribe(res => {
        this.router.navigate(["/appointment"]);
      });
    }
  }

 

}

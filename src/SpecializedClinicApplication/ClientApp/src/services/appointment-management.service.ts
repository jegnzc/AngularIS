import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError, catchError } from 'rxjs';
import { UrlKeys } from './url-keys';
import { Appointment } from '../models/appointment.model';

@Injectable()
export class AppointmentManagementService {
  constructor(private http: HttpClient) {
  }

  patchAppointment(appointment: Appointment): Observable<any> {
    return this.http.patch(UrlKeys.APPOINTMENT + "/" + appointment.id, appointment);
  }

  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post(UrlKeys.APPOINTMENT, appointment);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(UrlKeys.APPOINTMENT + "/" + id);
  }

  getAppointment(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(UrlKeys.APPOINTMENT + "/" + id);
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(UrlKeys.APPOINTMENT);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Appointment } from '../../models/appointment.model';
import { fadeInOut } from '../../services/animations';
import { AppointmentManagementService } from '../../services/appointment-management.service';
import { ConfirmDialogComponent } from '../dialog-components/confirm-dialog.component';

@Component({
  selector: 'manage-appointments-component',
  templateUrl: './manage-appointments.component.html',
  styleUrls: ['./manage-appointments.component.scss'],
  animations: [fadeInOut]
})
export class ManageAppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  displayedColumns: string[] = ['id', 'client', 'service', 'date', 'reason', 'actions'];
  paginatorServices: Appointment[] = [];

  dataSource = new MatTableDataSource<Appointment>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  constructor(
    public appointmentService: AppointmentManagementService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  openDialog(appointment: Appointment) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: "Cita",
      description: "Eliminar",
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.appointmentService.deleteAppointment(appointment.id!).subscribe(result => {
            this.dataSource.data.splice(appointment.index!, 1);
            this.dataSource._updateChangeSubscription();
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.matPaginator;
          });
        }
      }
    );
  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.paginatorServices.length) {
      endIndex = this.paginatorServices.length;
    }
    this.dataSource.data = this.paginatorServices.slice(startIndex, endIndex);
  }

  ngOnInit() {
    this.appointmentService.getAllAppointments().subscribe(result => {
      this.paginatorServices = result;
      this.appointments = this.paginatorServices.slice(0, 5);
      result.forEach(function (row, index) {
        row.index = index;
      });
      this.dataSource.data = this.appointments;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.matPaginator;
    });
  }

  applyFilter(filterValue: Event) {
    let value = (event!.target as HTMLInputElement).value;

    value = value.trim(); // Remove whitespace
    value = value.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = value;
  }

  delete(appointment: Appointment) {
    this.appointmentService.deleteAppointment(appointment.id!).subscribe(result => {
      this.dataSource.data.splice(appointment.index!, 1);
      this.dataSource._updateChangeSubscription();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.matPaginator;
    });
  }

  edit(appointment: Appointment) {
    this.router.navigate(["/appointment/edit", appointment.id!]);
  }

  goToAddAppointment() {
    this.router.navigate(["/appointment/add"]);
  }
}

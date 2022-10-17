import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Service } from '../../models/service.model';
import { fadeInOut} from '../../services/animations';
import { ServiceManagementService } from '../../services/services-management.service';
import { ConfirmDialogComponent } from '../dialog-components/confirm-dialog.component';

@Component({
  selector: 'manage-services-component',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.scss'],
  animations: [fadeInOut]
})
export class ManageServicesComponent implements OnInit {
  services: Service[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  dataSource = new MatTableDataSource<Service>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  constructor(
    public clinicServiceService: ServiceManagementService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  openDialog(service: Service) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: "Usuario",
      description: "Eliminar",
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.clinicServiceService.deleteService(service.id!).subscribe(result => {
            this.dataSource.data.splice(service.index!, 1);
            this.dataSource._updateChangeSubscription();
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.matPaginator;
          });
        }
      }
    );
  }
  ngOnInit() {
    this.clinicServiceService.getAllServices().subscribe(result => {
      result.forEach(function (row, index) {
        row.index = index;
      });
      this.services = result;
      this.dataSource.data = this.services;
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

  delete(service: Service) {
    this.clinicServiceService.deleteService(service.id!).subscribe(result => {
      this.dataSource.data.splice(service.index!, 1);
      this.dataSource._updateChangeSubscription();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.matPaginator;
    });
  }

  edit(service: Service) {
    this.router.navigate(["/service/edit", service.id!]);
  }

  goToAddService() {
    this.router.navigate(["/service/add"]);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Client } from '../../models/client.model';
import { ClientManagementService } from '../../services/client-management.service';
import { ConfirmDialogComponent } from '../dialog-components/confirm-dialog.component';

@Component({
  selector: 'manage-clients-component',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.scss']
})
export class ManageClientsComponent implements OnInit {
  clients: Client[] = [];
  displayedColumns: string[] = ['id', 'name', 'address', 'email', 'phoneNumber', 'actions'];

  dataSource = new MatTableDataSource<Client>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  constructor(
    public clientService: ClientManagementService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  openDialog(client: Client) {
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
          this.clientService.deleteClient(client.id!).subscribe(result => {
            this.dataSource.data.splice(client.index!, 1);
            this.dataSource._updateChangeSubscription();
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.matPaginator;
          });
        }
      }
    );
  }
  ngOnInit() {
    this.clientService.getAllClients().subscribe(result => {
      result.forEach(function (row, index) {
        row.index = index;
      });
      this.clients = result;
      this.dataSource.data = this.clients;
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

  delete(client: Client) {
    this.clientService.deleteClient(client.id!).subscribe(result => {
      this.dataSource.data.splice(client.index!, 1);
      this.dataSource._updateChangeSubscription();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.matPaginator;
    });
  }

  edit(client: Client) {
    this.router.navigate(["/client/edit", client.id!]);
  }

  goToAddClient() {
    this.router.navigate(["/client/add"]);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { fadeInOut } from '../../services/animations';
import { UserManagementService } from '../../services/user-management.service';
import { ConfirmDialogComponent } from '../dialog-components/confirm-dialog.component';

@Component({
  selector: 'manage-users-component',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
  animations: [fadeInOut]
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'userName', 'email', 'role', 'actions'];

  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  constructor(
    public userService: UserManagementService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  openDialog(user: User) {
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
          this.userService.deleteUser(user.id!).subscribe(result => {
            this.dataSource.data.splice(user.index!, 1);
            this.dataSource._updateChangeSubscription();
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.matPaginator;
          });
        }
      }
    );
  }
  ngOnInit() {
    this.userService.getAllUsers().subscribe(result => {
      result.forEach(function (row, index) {
        row.index = index;
      });
      this.users = result;
      this.dataSource.data = this.users;
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

  delete(user: User) {
    this.userService.deleteUser(user.id!).subscribe(result => {
      this.dataSource.data.splice(user.index!, 1);
      this.dataSource._updateChangeSubscription();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.matPaginator;
    });
  }

  edit(user: User) {
    this.router.navigate(["/user/edit", user.id!]);
  }

  goToAddUser() {
    this.router.navigate(["/user/add"]);
  }
}

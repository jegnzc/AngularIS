import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { fadeInOut } from '../../services/animations';
import { ProductService } from '../../services/product.service';
import { ConfirmDialogComponent } from '../dialog-components/confirm-dialog.component';

@Component({
  selector: 'manage-products-component',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
  animations: [fadeInOut]
})
export class ManageProductsComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'actions'];
  paginatorServices: Product[] = [];

  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  constructor(
    public productService: ProductService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  openDialog(product: Product) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: "Producto",
      description: "Eliminar",
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.productService.deleteProduct(product.id!).subscribe(result => {
            this.dataSource.data.splice(product.index!, 1);
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
    this.productService.getAllProducts().subscribe(result => {
      this.paginatorServices = result;
      this.products = this.paginatorServices.slice(0, 5);
      result.forEach(function (row, index) {
        row.index = index;
      });
      this.dataSource.data = this.products;
      this.dataSource.paginator = this.matPaginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: Event) {
    let value = (event!.target as HTMLInputElement).value;

    value = value.trim(); // Remove whitespace
    value = value.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = value;
  }

  delete(product: Product) {
    this.productService.deleteProduct(product.id!).subscribe(result => {
      this.dataSource.data.splice(product.index!, 1);
      this.dataSource._updateChangeSubscription();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.matPaginator;
    });
  }

  edit(product: Product) {
    this.router.navigate(["/product/edit", product.id!]);
  }

  goToAddProduct() {
    this.router.navigate(["/product/add"]);
  }
}

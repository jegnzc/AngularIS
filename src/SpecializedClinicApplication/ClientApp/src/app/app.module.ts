import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatModule } from '../material.module';
import { AuthService } from '../services/authentication.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagementService } from '../services/user-management.service';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ConfirmDialogComponent } from '../../src/app/dialog-components/confirm-dialog.component';
import { EditRowComponent } from './edit-row/edit-row.component';
import { EditUserComponent } from './manage-users/edit-user/edit-user.component';
import { AddUserComponent } from './manage-users/add-user/add-user.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { EditProductComponent } from './manage-products/edit-product/edit-product.component';
import { AddProductComponent } from './manage-products/add-product/add-product.component';
import { ProductService } from '../services/product.service';
import { ManageClientsComponent } from './manage-clients/manage-clients.component';
import { EditClientComponent } from './manage-clients/edit-client/edit-client.component';
import { AddClientComponent } from './manage-clients/add-client/add-client.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    SettingsComponent,
    ProfileComponent,
    ManageUsersComponent,
    ManageProductsComponent,
    ManageClientsComponent,
    ConfirmDialogComponent,
    EditRowComponent,
    EditUserComponent,
    EditProductComponent,
    EditClientComponent,
    AddUserComponent,
    AddProductComponent,
    AddClientComponent
  ],
  providers: [AuthService, UserManagementService, ProductService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule { }

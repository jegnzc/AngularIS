import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AddUserComponent } from './manage-users/add-user/add-user.component';
import { EditUserComponent } from './manage-users/edit-user/edit-user.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { SettingsComponent } from './settings/settings.component';

//Guard
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children:
      [
        {
          path: 'settings',
          pathMatch: 'full',
          component: SettingsComponent
        },
        { path: 'logout', pathMatch: 'full', component: LogoutComponent },
        { path: 'user', pathMatch: 'full', component: ManageUsersComponent },
        { path: 'user/edit/:id', pathMatch: 'full', component: EditUserComponent },
        { path: 'user/add', pathMatch: 'full', component: AddUserComponent },
      ]
  },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

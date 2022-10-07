import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MenuComponent } from './menu/menu.component';

//Guard
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '', component: AppComponent, canActivate: [AuthGuard], children:
      [
      //{
      //  path: '',
      //  redirectTo: 'start',
      //  pathMatch: 'full'
      //},
      //{
      //  path: 'start',
      //  component: MenuComponent
      //},
      ]
  },
  { path: 'logout', pathMatch: 'full', component: LogoutComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

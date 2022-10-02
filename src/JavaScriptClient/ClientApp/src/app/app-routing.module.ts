import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Guard
import { AuthGuard } from './shared/auth.guard';
const routes: Routes = [
  { path: '', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

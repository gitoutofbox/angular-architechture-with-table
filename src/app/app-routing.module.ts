import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/authentication';

import { ChartsComponent } from './components/charts/charts.component';


const routes: Routes = [
  { path: 'home', loadChildren: './modules/home/home.module#HomeModule' },
  { path: 'about', loadChildren: './modules/about/about.module#AboutModule' },
  { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
  { path: 'users', loadChildren: './modules/users/users.module#UsersModule', canActivate: [AuthGuard] },
  { path: 'registration', loadChildren: './modules/registration/registration.module#RegistrationModule' },
  { path: 'charts', component: ChartsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

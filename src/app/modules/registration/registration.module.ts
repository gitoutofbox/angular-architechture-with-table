import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './pages/registration.component';
import { CanDeactivateGuard } from '@shared/guards/can-deactivate.guard';
import { SharedModule } from '@shared/shared.module'
const routes: Routes = [
    { path: '', component: RegistrationComponent, canDeactivate:[CanDeactivateGuard] }
];

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports:[
    RegistrationComponent
  ]
})
export class RegistrationModule { }

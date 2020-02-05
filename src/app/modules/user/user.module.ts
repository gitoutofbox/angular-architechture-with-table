import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './pages/login/login.component';
import { ListComponent } from './pages/list/list.component';
import { UpdateComponent } from './pages/update/update.component';


import { ChangeStatusComponent } from './components/change-status/change-status.component';
import { ActionEditComponent } from './components/action-edit/action-edit.component';
import { ActionDeleteComponent } from './components/action-delete/action-delete.component';
import { ActionDropdownComponent } from './components/action-dropdown/action-dropdown.component';
import { FiltersComponent } from './components/filters/filters.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'list', component: ListComponent },
  { path: 'add', component: UpdateComponent },
  { path: 'update', component: UpdateComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    LoginComponent,
    ListComponent, 
    UpdateComponent, 
    ChangeStatusComponent, 
    ActionEditComponent,  
    ActionDeleteComponent, ActionDropdownComponent, FiltersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class UserModule { }

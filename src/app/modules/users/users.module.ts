import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

import { ListComponent } from './pages/list/list.component';
import { UpdateComponent } from './pages/update/update.component';

import { ChangeStatusComponent } from './components/change-status/change-status.component';
import { ActionEditComponent } from './components/action-edit/action-edit.component';
import { ActionDeleteComponent } from './components/action-delete/action-delete.component';
import { ActionDropdownComponent } from './components/action-dropdown/action-dropdown.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'update', component: UpdateComponent }
];

@NgModule({
  declarations: [
    ListComponent, 
    UpdateComponent, 
    ChangeStatusComponent, 
    ActionEditComponent,  
    ActionDeleteComponent, ActionDropdownComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class UsersModule { }

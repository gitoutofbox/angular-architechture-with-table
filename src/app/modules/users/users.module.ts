import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { UpdateComponent } from './pages/update/update.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'update', component: UpdateComponent }
];

@NgModule({
  declarations: [ListComponent, UpdateComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
  ]
})
export class UsersModule { }

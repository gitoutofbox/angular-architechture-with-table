import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalWindowComponent } from './components/modal-window/modal-window.component';

import { HeaderComponent } from './components/header/header.component';
import { PaginationComponent } from './components/pagination/pagination.component';

import { ChartsModule } from './modules/charts/charts.module';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
// import { DataTableModule } from './modules/data-table/data-table.module';
// import { ComponentLoaderComponent } from './components/component-loader/component-loader.component';


@NgModule({
  declarations: [HeaderComponent, ModalWindowComponent, PaginationComponent, FileUploaderComponent, 
   // ComponentLoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule,
    FormsModule
    // DataTableModule
  ],
  exports: [HeaderComponent, ModalWindowComponent,
    PaginationComponent, ChartsModule, FileUploaderComponent
    // DataTableModule,
    //ComponentLoaderComponent
  ]
})
export class SharedModule { }

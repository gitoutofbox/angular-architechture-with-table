import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalWindowComponent } from './components/modal-window/modal-window.component';

import { HeaderComponent } from './components/header/header.component';
import { PaginationComponent } from './components/pagination/pagination.component';

import { ChartsModule } from './modules/charts/charts.module';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
// import { DataTableModule } from './modules/data-table/data-table.module';
// import { ComponentLoaderComponent } from './components/component-loader/component-loader.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@shared/interceptors/jwt.interceptor';
// import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';
import { UserIdleTimerService } from './services/user-idle-timer.service';
import { PasswordStrengthMeterComponent } from './components/password-strength-meter/password-strength-meter.component'

@NgModule({
  declarations: [HeaderComponent, ModalWindowComponent, PaginationComponent, FileUploaderComponent, AutocompleteComponent, PasswordStrengthMeterComponent,
    // ComponentLoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule,
    FormsModule
    // DataTableModule
  ],
  providers: [
    UserIdleTimerService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  exports: [HeaderComponent, ModalWindowComponent,
    PaginationComponent, ChartsModule, FileUploaderComponent,
    AutocompleteComponent,
    PasswordStrengthMeterComponent
    // DataTableModule,
    //ComponentLoaderComponent
  ]
})
export class SharedModule {
  constructor(private userIdleTimerService: UserIdleTimerService) {
    
  }
}

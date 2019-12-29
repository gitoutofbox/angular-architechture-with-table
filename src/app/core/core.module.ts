import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtInterceptor, ErrorInterceptor } from './authentication';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [JwtInterceptor, ErrorInterceptor]
})
export class CoreModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
//import { CoreModule } from './core/core.module';
// import { JwtInterceptor } from '@shared/interceptors/jwt.interceptor';
// import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module'
import { AppComponent } from './app.component';

import { ChartsComponent } from './components/charts/charts.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

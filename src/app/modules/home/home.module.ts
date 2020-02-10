import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';

import { RegistrationModule } from '@modules/registration/registration.module';

@NgModule({
  declarations: [HomeComponent, TestimonialComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    RegistrationModule
  ]
})
export class HomeModule { }

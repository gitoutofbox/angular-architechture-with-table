import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './pages/about/about.component';
import { OurClientsComponent } from './components/our-clients/our-clients.component';
import { OurServicesComponent } from './pages/our-services/our-services.component';
import { OurPartnersComponent } from './pages/our-partners/our-partners.component';
import { CareerComponent } from './pages/career/career.component';

@NgModule({
  declarations: [AboutComponent, OurClientsComponent, OurServicesComponent, OurPartnersComponent, CareerComponent],
  imports: [
    CommonModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }

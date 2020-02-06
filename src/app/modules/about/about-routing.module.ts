import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';

import { AboutComponent } from './pages/about/about.component';
import { OurClientsComponent } from './components/our-clients/our-clients.component';
import { OurServicesComponent } from './pages/our-services/our-services.component';
import { OurPartnersComponent } from './pages/our-partners/our-partners.component';
import { CareerComponent } from './pages/career/career.component';


const routes: Routes = [
    {
        path: '', 
        // component: AboutComponent,
        canActivateChild:[AuthGuard],
        children: [
            {path: 'about-us', component: AboutComponent},
            {path: 'our-clients', component: OurClientsComponent},
            {path: 'our-services', component: OurServicesComponent},
            {path: 'our-partners', component: OurPartnersComponent},
            {path: 'career-with-us', component: CareerComponent}
        ]
    },
  { path: 'about', redirectTo: 'about/our-clients', pathMatch: 'full' }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AboutRoutingModule { }

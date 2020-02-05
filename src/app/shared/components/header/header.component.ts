import { Component } from '@angular/core';
import { AuthenticationService } from '@shared/services/authentication.service';
import { User } from '@shared/models/user';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentUser: User;
  showModal: boolean = false;
  skipNavigation: string;
  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    

      router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
        if( ! this.router.url.endsWith('#main-content')) {
            this.skipNavigation = `#main-content`;
        }
     });

     
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

  openModal() {
    this.showModal = !this.showModal;
  }
}
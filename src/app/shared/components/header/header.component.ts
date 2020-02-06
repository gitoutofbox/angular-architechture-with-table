import { Component } from '@angular/core';
import { AuthenticationService } from '@shared/services/authentication.service';
import { User } from '@shared/models/user';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthGuard } from '@shared/guards/auth.guard'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentUser: User;
  showModalNoAccess: boolean = false;
  skipNavigation: string;

  modalHeaderNoAccess: string = '';
  modalBodyNoAccess: string = '';
  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private authGuard: AuthGuard
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
          router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
        if( ! this.router.url.endsWith('#main-content')) {
            this.skipNavigation = `#main-content`;
        }
     });
     this.authGuard.noPermissionObservable.subscribe(permission => {
       if(permission.status == 'no-access') {
        this.modalHeaderNoAccess = permission.header;
        this.modalBodyNoAccess = permission.body;
        this.openModal();
       }
     });
     
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

  openModal() {
    this.showModalNoAccess = !this.showModalNoAccess;
  }
}
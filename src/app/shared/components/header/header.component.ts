import { Component } from '@angular/core';
import { AuthenticationService } from '@shared/services/authentication.service';
import { User } from '@shared/models/user';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthGuard } from '@shared/guards/auth.guard'
import { UserIdleTimerService } from '@shared/services/user-idle-timer.service';

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
      private authGuard: AuthGuard,
      private userIdleTimerService: UserIdleTimerService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      
      this.authGuard.noPermissionObservable.subscribe(permission => {
       if(permission.status == 'no-access') {
        this.modalHeaderNoAccess = permission.header;
        this.modalBodyNoAccess = permission.body;
        this.openModal();
       }
     });
     
    //  this.userIdleTimerService.isUserInactive.subscribe(() => {
    //   this.modalHeaderNoAccess = 'Inactivity';
    //     this.modalBodyNoAccess = 'You are idle for a long time, click Close to avoid logout'
    //     this.openModal();
    // })
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

  openModal() {
    this.showModalNoAccess = true;
  }
  closeModal() {
    this.showModalNoAccess = false;
  }
  openDemoModal() {
    this.modalHeaderNoAccess  = 'Sample Modal'
    this.modalBodyNoAccess    = 'This is the body of sample modal window';
    this.openModal();
  }
}
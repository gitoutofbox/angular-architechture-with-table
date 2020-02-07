import { Injectable, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserIdleTimerService {
  private userActiveTimer;
  public isUserInactive: Subject<any> = new Subject();
  constructor() {
    this.timeoutUserActivity();
    this.isUserInactive.subscribe(() => console.log('user has been inactive for 3m'));
    console.log('asd')
   }

   timeoutUserActivity() {
    this.userActiveTimer = setTimeout(() => this.isUserInactive.next(undefined), 30000);
  }

  @HostListener('window:mousemove')
  @HostListener('window:click') 
  @HostListener('window:keydown') 
  refreshUserState() {
    clearTimeout(this.userActiveTimer);
    this.timeoutUserActivity();
  }
  // @HostListener('window:unload', ['$event'])
  // beforeunloadHandler(event) {
  //   alert('asd')
  // }

}

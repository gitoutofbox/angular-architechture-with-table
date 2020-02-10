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
    this.isUserInactive.subscribe(() => console.log('user has been inactive for 30m'));
   }

   timeoutUserActivity() {
    this.userActiveTimer = setTimeout(() => this.isUserInactive.next(undefined), 30 * 60 * 1000);
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

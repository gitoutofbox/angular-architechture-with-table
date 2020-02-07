import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { AuthenticationService } from '@shared/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
    private noPermissionSubject: BehaviorSubject<any>;
    public noPermissionObservable: Observable<any>;
    
    constructor(private router: Router, private authenticationService: AuthenticationService) {
        this.noPermissionSubject = new BehaviorSubject<any>({});
        this.noPermissionObservable = this.noPermissionSubject.asObservable();
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const data = {
            "status": "no-access",
            "header": "No access",
            "body": "You dont have permission access to this page"
        }
        this.noPermissionSubject.next(data);
        return false;
    }
}
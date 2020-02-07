import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@shared/services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.authenticationService.currentUserValue;
        console.log('currentUser', currentUser)
        if (currentUser && currentUser.authToken) {
            request = request.clone({
                setHeaders: {
                    Authtoken: `${currentUser.authToken}`
                }
            });
        }

        // return next.handle(request);
        return next.handle(request).pipe(
            catchError(err => {
                console.log('err', err)
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                console.log('not authorized')
                this.authenticationService.logout();
                location.reload(true);
            }

            const error = err.statusMessage || 'Not authorized';
            return throwError(error);
        }
        ))
    }
}
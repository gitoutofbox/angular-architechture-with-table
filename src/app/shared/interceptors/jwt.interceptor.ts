import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

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
                    Authtoken: `213${currentUser.authToken}`
                }
            });
        }

        return next.handle(request);
    }
}
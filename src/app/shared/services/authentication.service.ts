import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable , throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { User } from '@shared/models/user';
import { ApiService } from '@shared/services/api.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private apiService: ApiService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.apiService.post(`http://localhost:8081/user/login`, { "email": username, "password": password })
            .pipe(
                map((user) => {
                console.log('user', user['data'])
                
                if(user['status'] !== 'success' || !user['data'] || !user['data']['userInfo']) {                   
                    throw new Error('Invalid login credentials');
                }
                const userInfo = user['data']['userInfo'];
                const currentUser = {
                    "id"        : userInfo['user_id'],
                    "username"  : userInfo['user_email'],
                    "firstName" : userInfo['user_first_name'],
                    "lastName"  : userInfo['user_last_name'],
                    "photo"     : userInfo['user_photo'],
                    "status"    : userInfo['is_active'],
                    "authToken" : user['data']['authToken']
                };
                console.log(currentUser)
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                this.currentUserSubject.next(currentUser);
                return user;
            })
            );
    }
    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
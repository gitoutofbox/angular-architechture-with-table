import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable , throwError } from 'rxjs';
import { map } from 'rxjs/operators';

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
        return this.apiService.post(`http://localhost:8081/user/authenticate`, { "email": username, "password": password })
            .pipe(
                map((user) => {
                console.log('user', user['data'])
                if(user['status'] !== 'success' || !user['data']) {                   
                    throw new Error('Invalid login credentials');
                }
                const currentUser = {
                    "id": user['data']['user_id'],
                    "username": user['data']['user_email'],
                    "firstName": user['data']['user_first_name'],
                    "lastName": user['data']['user_last_name'],
                    "photo": user['data']['user_photo'],
                    "status": user['data']['is_active'],
                    "token": "sfsdfsdf"
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
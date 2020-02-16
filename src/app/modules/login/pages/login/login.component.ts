import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { first } from 'rxjs/operators';
import { ApiService } from '@shared/services/api.service';

import { AuthenticationService } from '@shared/services/authentication.service';
import { fromEvent } from 'rxjs';
import { exhaustMap, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginButton', { static: false }) loginButton: ElementRef;
  apiCalled: number = 0;
  loginCalled: number = 0;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private apiService: ApiService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngAfterViewInit() {
    fromEvent(this.loginButton.nativeElement, 'click').pipe(
      map(r => {this.loginCalled++; return r}),
      exhaustMap(() => {
        console.log('sending api call to register');
        this.submitted = true;
        if (this.loginForm.invalid) {
          return;
        }
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.loading = true;

        const postData = {
          email: this.f.username.value,
          password: this.f.password.value
        };
        this.apiCalled++;
        return this.apiService.post('http://localhost:8081/user/login', postData)
      }
      )
    ).subscribe(data => {

      this.router.navigate([this.returnUrl]);
    },
      error => {
        this.error = error;
        this.loading = false;
      }
    )
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['admin@admin.com', Validators.required],
      password: ['admin', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  // onSubmit() {
  //   this.submitted = true;
  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  //   this.loading = true;
  //   this.authenticationService.login(this.f.username.value, this.f.password.value)
  //     .subscribe(
  //       data => {
  //         this.router.navigate([this.returnUrl]);
  //       },
  //       error => {
  //         this.error = error;
  //         this.loading = false;
  //       }
  //     )

  // }
}
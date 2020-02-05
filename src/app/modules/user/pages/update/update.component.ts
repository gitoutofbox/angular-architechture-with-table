import { Component, OnInit } from '@angular/core';
import {FormArray,FormBuilder,FormGroup,FormControl, Validators, NgForm} from "@angular/forms";
import {Router} from "@angular/router"
import { ApiService } from '@shared/services/api.service';
import { exhaustMap } from 'rxjs/operators';
import { pipe, interval } from 'rxjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  userForm: FormGroup;
  isPhotoError = false;
  image: string;
  submitted : boolean = false;
  uploadError: string = '';
  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.newForm();
  }

  newForm = function () {
    this.userForm = this.fb.group({
      first_name    : ['', Validators.compose([Validators.required])],
      last_name     : ['', Validators.compose([Validators.required])],
      email         : ['', Validators.compose([Validators.required, Validators.email])],
      user_password : ['', Validators.compose([Validators.required])],
      active        : [''],
      photo         : ['', Validators.compose([Validators.required])]
    })
  }

  PostData(form: NgForm) {
    this.submitted = true;
    if(!this.userForm.valid) {
      return false;
    }
    if (this.userForm.get('photo').invalid) {
      this.isPhotoError = true;
    }
    this.uploadError = '';
    const formData = new FormData();
    formData.append("first_name", this.userForm.controls.first_name.value);
    formData.append("last_name", this.userForm.controls.last_name.value);
    formData.append("email", this.userForm.controls.email.value);
    formData.append("user_password", this.userForm.controls.user_password.value);
    formData.append("active", this.userForm.controls.active.value);    
    formData.append('photo', this.userForm.get('photo').value);
  
    // interval(1000).pipe(exhaustMap(() => this.apiService.post('http://localhost:8081/user/add', formData))).subscribe(resp => {
    //     if(resp['status'] != 'success') {
    //       this.uploadError = resp['statusMessage'];
    //       return;
    //     }
    //     this.router.navigate(['/users'])
    //   }, (resp)=> {
    //     this.uploadError = 'Some error occured please try later';
    //     console.log(resp);
    //   });
    // );
    this.apiService.post('http://localhost:8081/user/add', formData).subscribe(resp => {
      if(resp['status'] != 'success') {
        this.uploadError = resp['statusMessage'];
        return;
      }
      this.router.navigate(['/users'])
    }, (resp)=> {
      this.uploadError = 'Some error occured please try later';
      console.log(resp);
    });


  }

  onFileSelect(file: Event) {
    this.userForm.patchValue({ photo: file });
    this.userForm.get('photo').updateValueAndValidity();
  }



}

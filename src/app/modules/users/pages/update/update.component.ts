import { Component, OnInit } from '@angular/core';
import {FormArray,FormBuilder,FormGroup,FormControl, Validators, NgForm} from "@angular/forms";
import {Router} from "@angular/router"
import { ApiService } from '@core/services/api.service';

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
    const formData = new FormData();
    
    // console.log(this.userForm.controls);
    formData.append("first_name", this.userForm.controls.first_name.value);
    formData.append("last_name", this.userForm.controls.last_name.value);
    formData.append("email", this.userForm.controls.email.value);
    formData.append("user_password", this.userForm.controls.user_password.value);
    formData.append("active", this.userForm.controls.active.value);    
    formData.append('photo', this.userForm.get('photo').value);
  
    this.apiService.post('http://localhost:8081/user/add', formData).subscribe(resp => {
      this.router.navigate(['/users'])
    });


  }

  onFileSelect(file: Event) {
    this.userForm.patchValue({ photo: file });
    this.userForm.get('photo').updateValueAndValidity();
  }



}

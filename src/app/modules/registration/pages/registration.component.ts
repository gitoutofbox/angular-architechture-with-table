import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {
 
  private submitted: boolean;
  private duplicateEmailDbounce;
  public registerForm = this.fb.group({
      email:    ['', Validators.compose([Validators.required, Validators.email]), this.isEmailUnique.bind(this)],
      passwords: this.fb.group({
        password: ['', Validators.compose([Validators.required])],
        confirmPassword: ['', Validators.compose([Validators.required])]
      }, {
        validator: this.confirmPasswordMatch('password', 'confirmPassword')
    })
  });
  
  constructor(private fb: FormBuilder) {}
  isEmailUnique(control: FormControl) {
    clearTimeout(this.duplicateEmailDbounce);
    const q = new Promise((resolve, reject) => {
      this.duplicateEmailDbounce = setTimeout(() => {
        console.log('sss')
        resolve({ 'isEmailUnique': true });
        //resolve(null);
        // this.userService.isEmailRegisterd(control.value).subscribe(() => {
        //   resolve(null);
        // }, () => { resolve({ 'isEmailUnique': true }); });
      }, 1000);
    });
    return q;
  }
  ngOnInit() {
    console.log(this.registerForm)
  }

  confirmPasswordMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.confirmPasswordMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmPasswordMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

  // setupEditData(editDataObj: Email) {
  //     this.editData = {id:editDataObj.id, name: editDataObj.name, email: editDataObj.email};
  //     this.userForm.setValue(this.editData);
  // }

  
  onSubmit(){
  //     this.submitted = true;
  //     if(this.userForm.valid) {
  //         let postData = {
  //             id      : this.userForm.value.id,
  //             name    : this.userForm.value.name,
  //             email   : this.userForm.value.email
  //         }
  //         if(this.userForm.value.id != '') {
  //             this.apiService.put('http://localhost:3003/email', postData).subscribe(data => {
                  
  //                 this.messageService.setMessage(1);
  //                 this.router.navigate(['/emails']);
  //             });
  //         } else {
  //             this.apiService.post('http://localhost:3003/email', postData).subscribe(data => {
  //                 this.router.navigate(['/emails']);
  //             });
  //         }
  //     }
      
   };

}
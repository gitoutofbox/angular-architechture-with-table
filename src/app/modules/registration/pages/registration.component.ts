import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { CanComponentDeactivate } from '@shared/guards/can-deactivate.guard';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit, CanComponentDeactivate   {
 
  private submitted: boolean;
  private duplicateEmailDbounce;

  public showModalConfirmNavigation: boolean = false;
  public navigateConfirmSubject$: Subject<boolean> = new Subject<boolean>();
  constructor(private fb: FormBuilder) {

  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // if ((this.user.name.length > 0 || this.user.email.length > 0) && !this.saved) {
    //   return confirm('Your changes are unsaved!! Do you like to exit');
    // }
    if(this.registerForm.touched) {
     // return confirm('Your changes are unsaved!! Do you like to exit');
      this.showModalConfirmNavigation = true;
      return this.navigateConfirmSubject$;
    } else {
      return true;
    }
  }
  navigateAction(yesOrNo: boolean) {
    this.showModalConfirmNavigation = false;
    this.navigateConfirmSubject$.next(yesOrNo);
  }


  public registerForm = this.fb.group({
      email:    ['', Validators.compose([Validators.required, Validators.email]), this.isEmailUnique.bind(this)],
      passwords: this.fb.group({
        password: ['', Validators.compose([Validators.required])],
        confirmPassword: ['', Validators.compose([Validators.required])]
      }, {
        validator: this.confirmPasswordMatch('password', 'confirmPassword')
    })
  });
  
  
  isEmailUnique(control: FormControl) {
    clearTimeout(this.duplicateEmailDbounce);
    const q = new Promise((resolve, reject) => {
      this.duplicateEmailDbounce = setTimeout(() => {
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
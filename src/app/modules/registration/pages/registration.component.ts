import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { Observable, Subject, fromEvent } from 'rxjs';
import { CanComponentDeactivate } from '@shared/guards/can-deactivate.guard';
import { exhaustMap, switchMap, map } from 'rxjs/operators';
import { ApiService } from '@shared/services/api.service';
import { DuplicateEmailValidator } from '../validators/email.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit, CanComponentDeactivate, AfterViewInit, OnDestroy   {
 
  private submitted: boolean;
  private duplicateEmailDbounce;
  // hobbies: FormArray;

  @ViewChild('submitButton', {static: false}) submitButton: ElementRef;

  public showModalConfirmNavigation: boolean = false;
  public navigateConfirmSubject$: Subject<boolean> = new Subject<boolean>();
  constructor(private fb: FormBuilder, private apiService: ApiService) {

  }
  ngAfterViewInit() {   
    fromEvent(this.submitButton.nativeElement, 'click').pipe(
      exhaustMap(() => {
        console.log('sending api call to register');
        console.log(this.registerForm)
        const postData = {
          email: this.registerForm.controls.email.value,
          password: this.registerForm.controls.passwords['controls'].password.value
        };
        return this.apiService.post('http://localhost:8081/user/register', postData)
      }
    )
  ).subscribe((resp) => {
    console.log('Registration aesponse arrived');
      console.log('resp', resp);
  })}
  
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {    
    if(this.registerForm.touched) {
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
      email     : ['', 
                  [Validators.required, Validators.email], 
                  [
                    // this.isEmailUnique.bind(this),
                    // DuplicateEmailValidator(this.apiService)
                  ] //async validator(used as  in view)
                ],
      passwords : this.fb.group({
        password        : ['', Validators.compose([Validators.required])],
        confirmPassword : ['', Validators.compose([Validators.required])]
      }, {
        validator: this.confirmPasswordMatch('password', 'confirmPassword')
    }),
    hobbies: this.fb.array([ this.createHobby() ])
  });
  
  createHobby(): FormGroup {
    return this.fb.group({
      hobbyName:      ['', [Validators.required]],
      hobbyDetail:    ['', [Validators.required]]
    });
  }

  get hobbies(): FormArray {
    return this.registerForm.get('hobbies') as FormArray;
  } 

  addHobby(): void {
    this.hobbies.push(this.createHobby());
  }
  removeHobby(rowIndex: number) {
		this.hobbies.removeAt(rowIndex);
	}
  


  ngOnInit() {
    console.log(this.registerForm)
  }

  confirmPasswordMatch(controlName: string, matchingControlName: string) {    
    return (formGroup: FormGroup) => {
      // console.log(controlName, matchingControlName)
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

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
  isEmailUnique(control: FormControl) {
    clearTimeout(this.duplicateEmailDbounce);
    const q = new Promise((resolve, reject) => {
      this.duplicateEmailDbounce = setTimeout(() => {       
        this.apiService.post('http://localhost:8081/user/email-check', {"email": control.value}).subscribe((resp) => {
          resolve({ 'duplicateEmail': resp['data'].isDuplicate });
        }, () => { resolve({ 'duplicateEmail': true }); });
      }, 1000);
    });
    return q;
  }
  
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

   onStrengthChange(strength) {
     console.log(strength)
   }

   ngOnDestroy(){
    document.removeEventListener('click', this.submitButton.nativeElement, false);
    console.log("Removed event listener"); 
}
}
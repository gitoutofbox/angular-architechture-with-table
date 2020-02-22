import { AsyncValidatorFn, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { Observable, timer } from "rxjs";
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from '@shared/services/api.service';
import { Directive } from '@angular/core';

export function DuplicateEmailValidator(apiService: ApiService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        let debounceTime = 1000;
        return timer(debounceTime).pipe(switchMap(() => {
            return apiService.post('http://localhost:8081/user/email-check', { "email": control.value })
                .pipe(
                    map(resp => { 
                        return { "duplicateEmail": resp['data'].isDuplicate }
                     })
                )
        }))
    }
}


@Directive({
    selector: '[duplicateEmail][formControlName],[duplicateEmail][formControl],[duplicateEmail][ngModel]',
    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: DuplicateEmailValidatorDirective, multi: true }]
})
export class DuplicateEmailValidatorDirective implements AsyncValidator {
    constructor(private apiService: ApiService) { }

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return DuplicateEmailValidator(this.apiService)(control);
    }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';



export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({ providedIn: 'root' })
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    
    constructor() {
       
     }

    canDeactivate(component: CanComponentDeactivate) {
        return component.canDeactivate && component.canDeactivate();
    }

}
import { Injectable } from '@angular/core';
// import { ActionEditComponent } from '@modules/users/components/action-edit/action-edit.component';
// import { ActionDeleteComponent } from '@modules/users/components/action-delete/action-delete.component';
// import { ChangeStatusComponent } from '@modules/users/components/change-status/change-status.component';
// import { CheckRowComponent } from '@modules/users/components/check-row/check-row.component';


import { Type } from '@angular/core';
export class ComponentItem {
  constructor(public component: Type<any>, public data: any) {}
}



@Injectable({ providedIn: 'root' })
export class DynamicLoadService {
    constructor() { }
    getComponent() {
        return {
            // 'ActionEditComponent':  new ComponentItem(ActionEditComponent, {name: 'Bombasto', bio: 'Brave as they come'}),
            // 'ActionDeleteComponent':  new ComponentItem(ActionDeleteComponent, {name: 'Bombasto', bio: 'Brave as they come'}),
            // 'ChangeStatusComponent':  new ComponentItem(ChangeStatusComponent, {name: 'Bombasto', bio: 'Brave as they come'}),
            // 'CheckRowComponent':  new ComponentItem(CheckRowComponent, {}),
            
            
        };
    }
}
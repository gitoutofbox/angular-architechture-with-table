import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'action-dropdown',
  templateUrl: './action-dropdown.component.html',
  styleUrls: ['./action-dropdown.component.scss']
})
export class ActionDropdownComponent implements OnInit {
  public actionStatus: string = '';
  public showModal: boolean = false;
  @Input() data: Array<any> = [];
  @Output() onActionComplete: EventEmitter<Object> = new EventEmitter();
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  performAction() {
    switch (this.actionStatus) {
      case 'activate':
      case 'deactivate':
        this.changeStatus();
        break;
      case 'delete':
        this.delete();
        break;
    }
  }
  changeStatus() {
    const filteredArray = this.data.filter(function(item){
      return item.isSelected?item.user_id: null;
    });
    var ids = filteredArray.map(function(a) {return a.user_id;});
    
    if(filteredArray.length) {
      const payload = {
        status: this.actionStatus,
        ids: ids
      }
      this.apiService.post('http://localhost:8081/users/status', payload).subscribe(resp => {        
        this.onActionComplete.emit({"status": "success", "action":this.actionStatus});
        this.actionStatus = '';
      });
    } else{
      alert('Nothing selected');
    }
  }

  delete() {
    this.showModal = true;
  }
  doDelete() {
    const filteredArray = this.data.filter(function(item){
      return item.isSelected?item.user_id: null;
    });
    if(!filteredArray.length) {
      alert('Nothing selected');
      return false;
    }
    var ids = filteredArray.map(function(a) {return a.user_id;});
    this.apiService.post(`http://localhost:8081/users/delete`, ids).subscribe(resp => {
       this.onActionComplete.emit({"status": "success", "action":this.actionStatus})
       this.showModal = false;
       this.actionStatus = '';
    })
  }
}

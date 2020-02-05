import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '@shared/services/api.service';

@Component({
  selector: 'action-delete',
  templateUrl: './action-delete.component.html',
  styleUrls: ['./action-delete.component.sass']
})
export class ActionDeleteComponent implements OnInit {
  @Input() data: any;
  @Output() onDeleteSuccess: EventEmitter<Object> = new EventEmitter();

  public showModal: boolean = false;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }
  doDelete() {
    this.apiService.delete(`http://localhost:8081/user/${this.data.user_id}`).subscribe(resp => {
       this.onDeleteSuccess.emit(resp)
       this.showModal = false;
    })
  }
}

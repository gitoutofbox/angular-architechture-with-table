import { Component, OnInit } from '@angular/core';
// import { ApiService } from 'src/app/core/services/api.service';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public tableData: Array<any> = [];

  public totalRecords: number = 100;
  public recordsPerPage: number = 2;
  public currentPage: number = 1;

  public orderBy: number = 0;
  public orderType: string = 'DESC';
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getData();
  }
  getData() {
    const payload = {
      orderBy   : this.orderBy,
      orderType : this.orderType
    }
    this.apiService.post('http://localhost:8081/userList', payload).subscribe(resp => {
      this.tableData = resp['data'];
    });
  }
  doPaginate(toPage: number) {
    this.currentPage = toPage;
  }

  onDeleteSuccess(resp: Object) {
    this.getData();
  }


  checkAll(e: any) {
    const checked = e.currentTarget.checked ? true : false;
    for (let row of this.tableData) {
      row.isSelected = checked;
    }
  }
  onActionComplete(response) {
    console.log(response);
    if(response.status == "success") {
      this.getData();
    }
  }

  
  doSort(orderBy) {
    this.orderBy = orderBy;
    this.orderType =  this.orderType == 'DESC' ? 'ASC' : 'DESC';
    this.getData();
  }
  sortIcon(orderBy) {
    if(this.orderBy == orderBy){
      return `<i class="pull-right fa fa-chevron-${this.orderType == 'DESC'? 'down' : 'up'}" aria-hidden="true"></i>`;
    }
  }
}

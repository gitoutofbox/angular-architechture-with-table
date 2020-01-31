import { Component, OnInit } from '@angular/core';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public tableData: Array<any> = [];

  public totalRecords: number = 0;
  public recordsPerPage: number = 10;
  public currentPage: number = 1;

  public orderBy: number = 0;
  public orderType: string = 'DESC';

  public searchText: string = '';

  constructor(private apiService: ApiService) {}

  
  ngOnInit() {
    this.getData();
  }
  getData() {
    const payload = {
      orderBy: this.orderBy,
      orderType: this.orderType,
      currentPage: this.currentPage,
      recordsPerPage: this.recordsPerPage,
      searchText: this.searchText
    }
    this.apiService.post('http://localhost:8081/userList', payload).subscribe(resp => {
      this.tableData = resp['data']['rows'];
      this.totalRecords = resp['data']['totalRows'];
      console.log('this.totalRecords', this.totalRecords)
    });
  }
  doPaginate(toPage: number) {
    this.currentPage = toPage;
    this.getData();
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
    if (response.status == "success") {
      this.getData();
    }
  }


  doSort(orderBy) {
    this.orderBy = orderBy;
    this.orderType = this.orderType == 'DESC' ? 'ASC' : 'DESC';
    this.getData();
  }
  sortIcon(orderBy) {
    if (this.orderBy == orderBy) {
      return `<i class="pull-right fa fa-chevron-${this.orderType == 'DESC' ? 'down' : 'up'}" aria-hidden="true"></i>`;
    }
  }

  performSearch() {
    this.getData();
  }
  
}

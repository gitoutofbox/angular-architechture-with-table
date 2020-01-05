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

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.apiService.get('http://localhost:8081/userList').subscribe(resp => {
      this.tableData = resp['data'];  
    });
  }
  doPaginate(toPage: number) {
    this.currentPage = toPage;
  }

  onDeleteSuccess(resp: Object) {
    this.getData();
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit {
  public _totalRecords :number = 0;
  @Input() set totalRecords(value: number) {
    this._totalRecords = value;
    this.ngOnInit();

 }

  @Input() recordsPerPage: number = 0;
  @Input() currentPage: number = 8;
  @Input() showAllPages: boolean = false;
  @Input() showPageBefore: number = 3;
  @Input() showPageAfter: number = 3;
  @Output() doPaginate = new EventEmitter<number>();
  public totalPage: number = 0;
  constructor() { }

  ngOnInit() {
    this.totalPage = Math.ceil(this._totalRecords / this.recordsPerPage);
    //console.log(this._totalRecords, this.recordsPerPage, this.totalPage)
  }
  doPagination(toPage: number) {
    this.doPaginate.emit(toPage);
  }
}

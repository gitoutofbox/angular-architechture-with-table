import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit {
  @Input() totalRecords: number = 0;
  @Input() recordsPerPage: number = 0;
  @Input() currentPage: number = 8;
  @Input() showAllPages: boolean = false;
  @Input() showPageBefore: number = 3;
  @Input() showPageAfter: number = 3;
  @Output() doPaginate = new EventEmitter<number>();
  public totalPage: number = 0;
  constructor() { }

  ngOnInit() {
    this.totalPage = Math.ceil(this.totalRecords / this.recordsPerPage);
    console.log(this.totalRecords, this.recordsPerPage, this.totalPage)
  }
  doPagination(toPage: number) {
    this.doPaginate.emit(toPage);
  }
}

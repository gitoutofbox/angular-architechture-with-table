import { Component, OnInit, HostListener, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  public showFilters: boolean = false;
  public filter: string = '';
  public filterConnector: string = 'and';
  public itemSelected: boolean = false;
  public selectedItem: any;
  public filterBy : Object;
  public filteredItem : any;
  @Input('filteredData')
  set filteredData(value: Object) {
    this.filterBy = value;
  }
  @Output() onFilterApply : EventEmitter<Object> = new EventEmitter();

  constructor() { }
  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.showFilters = false;
    this.filter = '';
  }
  ngOnInit() {
  }

  openFilters() {
    this.showFilters = !this.showFilters;
    
  }
  showFilter(filterName: string, filteredItem ?: any) {
    this.filter = filterName ? filterName.toLowerCase() : '';
    
    if(typeof filteredItem !== 'undefined') {
      console.log('filteredDataItem', filteredItem)
      this.filteredItem = filteredItem;
    }
  }
  onSelect(selectedItem) {
    // console.log('selectedItem', selectedItem)
    this.selectedItem = selectedItem
    this.itemSelected = true;
  }
  apply(){
    this.onFilterApply.emit(this.selectedItem);
    this.showFilters = false;
  }
  removeFilter(filter) {
    // this.filterBy = this.filterBy.filter(item => item !== filter);
  }
}

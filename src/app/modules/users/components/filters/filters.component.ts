import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  public showFilters: boolean = false;
  public filter: string = '';
  public filterConnector: string = 'and';
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
  showFilter(filterName: string) {
    this.filter = filterName;
  }
  onSelect(selectedItem) {
    console.log('selectedItem', selectedItem)
  }
  
}

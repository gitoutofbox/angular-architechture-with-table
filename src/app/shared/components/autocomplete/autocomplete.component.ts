import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ApiService } from '@shared/services/api.service';

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  public autoCompleteUpdate = new Subject<string>();
  public autoCompleteNgModel: string = '';
  public _filteredData: any;
  public items: Array<any> = [];
  public apiInProgress: boolean = false;
  @Output() onSelect: EventEmitter<Object> = new EventEmitter();
  @Input('filteredData')
  set filteredData(item:any) {
    this._filteredData = item;
    this.autoCompleteNgModel = item.value.filterValue;
}

  public timeToCallApi: any = 2000;
  public timerToGetResponse: any = 5000;
  intervalCall;
  intervalGet;
  
  constructor(private apiService: ApiService) {}

  
  ngOnInit() {
    this.autoCompleteUpdate.pipe(         
      map((resp)=>{
        this.items = [];    
        clearInterval(this.intervalCall);
        this.timeToCallApi = 2000;
        this.intervalCall = setInterval(() => {
          this.timeToCallApi -= 100;
          if(this.timeToCallApi == 0) {clearInterval(this.intervalCall); this.timeToCallApi = 2000;}
        },100)
        return resp;
      }),
      debounceTime(2000),
      distinctUntilChanged(), 

      switchMap(value => {
        clearInterval(this.intervalGet); 
        this.timerToGetResponse = 5000;
        this.apiInProgress = true;
        this.intervalGet = setInterval(() => {
          this.timerToGetResponse -= 100;
          if(this.timerToGetResponse == 0) {clearInterval(this.intervalGet); this.timerToGetResponse = 5000;}
        },100) 
        return this.apiService.get(`http://localhost:8081/email/get/${this.autoCompleteNgModel}`) } )
    )
    .subscribe(resp => {
      clearInterval(this.intervalGet);
        console.log('api resp', resp)
        this.items = resp['data'];
        this.apiInProgress = false;
      })
  }

  selectItem(item: Object) {
    this._filteredData.value.value = item;
    this.onSelect.emit(this._filteredData);
    this.autoCompleteNgModel = item['user_email'];
    this.items = [];
  }
}

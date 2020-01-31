import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  public autoCompleteUpdate = new Subject<string>();
  public autoCompleteNgModel: string = '';
  public items: Array<any> = [];
  public apiInProgress: boolean = false;
  @Output() onSelect: EventEmitter<Object> = new EventEmitter();


  public timerToCallApi: any = 2000;
  public timerToGetresponse: any = 5000;
  intervalCall;
  intervalGet;
  
  constructor(private apiService: ApiService) {}

  
  ngOnInit() {
    this.autoCompleteUpdate.pipe(         
      map((resp)=>{
        if(resp.length < 3) {
          this.items = [];
          return { emitEvent: false };
        }
        clearInterval(this.intervalCall);
        this.timerToCallApi = 2000;
        this.intervalCall = setInterval(() => {
          this.timerToCallApi -= 100;
          if(this.timerToCallApi == 0) {clearInterval(this.intervalCall); this.timerToCallApi = 2000;}
        },100)
        return resp;
      }),
      debounceTime(2000),
      distinctUntilChanged(), 

      switchMap(value => {
        clearInterval(this.intervalGet); 
        this.timerToGetresponse = 5000;
        this.apiInProgress = true;
        this.intervalGet = setInterval(() => {
          this.timerToGetresponse -= 100;
          if(this.timerToGetresponse == 0) {clearInterval(this.intervalGet); this.timerToGetresponse = 5000;}
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
    this.onSelect.emit(item);
    this.autoCompleteNgModel = item['user_email'];
    this.items = [];
  }
}

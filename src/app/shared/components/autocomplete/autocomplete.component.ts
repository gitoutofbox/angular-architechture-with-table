import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  autoCompleteUpdate = new Subject<string>();
  autoCompleteNgModel: string = '';

  public timerToCallApi: any = 2000;
  public timerToGetresponse: any = 5000;
  intervalCall;
  intervalGet;
  constructor(private apiService: ApiService) {}

  
  ngOnInit() {

    this.autoCompleteUpdate.pipe(        
         
      map((resp)=>{
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
        this.intervalGet = setInterval(() => {
          this.timerToGetresponse -= 100;
          if(this.timerToGetresponse == 0) {clearInterval(this.intervalGet); this.timerToGetresponse = 5000;}
        },100) 
        return this.apiService.get('http://localhost:8081/email/get') } )
    )
    .subscribe(resp => {
      clearInterval(this.intervalGet);
        console.log('api resp', resp)
      })
  }

}

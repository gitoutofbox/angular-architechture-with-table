import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  constructor() { }
  private messageText: string;
  private messageArr: Object = 
  {
    1:  'Records Updated Successfully',
    2:  'Record Deleted Successfully'
  }
  setMessage(typeId:number) {
    this.messageText = this.messageArr[typeId];
  }
  // getMessage() {
  //   let messageText = this.messageText;
  //   this.messageText = '';
  //   return messageText;
  // }
  showMessage() {
    let messageText = this.messageText;
    this.messageText = '';
    if(messageText) {
      return '<ul class="messageText"><li>'+messageText+'</li></ul>';
    } {
      return '';
    }
  }
  
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.sass']
})
export class ModalWindowComponent implements OnInit {
  @Input() showModal:boolean = false;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  close() {
    if(this.onClose.observers.length > 0) {
      this.onClose.emit(true);
    } else {
      this.showModal = false;
    }
  }
}

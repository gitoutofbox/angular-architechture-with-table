import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.sass']
})
export class ModalWindowComponent implements OnInit {
  @Input() showModal:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  close() {
    this.showModal = false;
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public modalHeader : string;
  public modalBody : string;
  public showModal: boolean = false; 

  public modalHeader2 : string;
  public modalBody2 : string;
  public showModal2: boolean = false; 
  constructor() { }

  ngOnInit() {
  }

  openModal() {
    this.modalHeader  = 'Test Header';
    this.modalBody    = 'Test body';
    this.showModal    = true;
  }
  closeModal() {
    this.showModal    = false;
  }
  openModal2() {
    this.showModal    = false;
    this.modalHeader2  = 'Test Header 2';
    this.modalBody2    = 'Test body 2';
    this.showModal2    = true;
  }
  closeModal2() {
    this.showModal2    = false;
    this.openModal();
  }
}

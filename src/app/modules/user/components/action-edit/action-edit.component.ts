import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'action-edit',
  templateUrl: './action-edit.component.html',
  styleUrls: ['./action-edit.component.sass']
})
export class ActionEditComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}

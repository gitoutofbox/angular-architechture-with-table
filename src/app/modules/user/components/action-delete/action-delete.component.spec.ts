import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDeleteComponent } from './action-delete.component';

describe('ActionDeleteComponent', () => {
  let component: ActionDeleteComponent;
  let fixture: ComponentFixture<ActionDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

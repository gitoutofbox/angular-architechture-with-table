import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurClientsComponent } from './our-clients.component';

describe('OurClientsComponent', () => {
  let component: OurClientsComponent;
  let fixture: ComponentFixture<OurClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

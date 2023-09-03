import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTicketsComponent } from './action-tickets.component';

describe('ActionTicketsComponent', () => {
  let component: ActionTicketsComponent;
  let fixture: ComponentFixture<ActionTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

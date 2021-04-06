import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterpartyCreateComponent } from './counterparty-create.component';

describe('CounterpartyCreateComponent', () => {
  let component: CounterpartyCreateComponent;
  let fixture: ComponentFixture<CounterpartyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterpartyCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterpartyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

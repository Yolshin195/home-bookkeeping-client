import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomenclatureCreateComponent } from './nomenclature-create.component';

describe('NomenclatureCreateComponent', () => {
  let component: NomenclatureCreateComponent;
  let fixture: ComponentFixture<NomenclatureCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NomenclatureCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NomenclatureCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

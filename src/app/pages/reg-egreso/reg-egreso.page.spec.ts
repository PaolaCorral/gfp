import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegEgresoPage } from './reg-egreso.page';

describe('RegEgresoPage', () => {
  let component: RegEgresoPage;
  let fixture: ComponentFixture<RegEgresoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegEgresoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegEgresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

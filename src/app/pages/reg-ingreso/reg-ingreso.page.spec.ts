import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegIngresoPage } from './reg-ingreso.page';

describe('RegIngresoPage', () => {
  let component: RegIngresoPage;
  let fixture: ComponentFixture<RegIngresoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegIngresoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegIngresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

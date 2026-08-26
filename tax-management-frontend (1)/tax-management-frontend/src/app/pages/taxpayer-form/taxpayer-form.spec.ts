import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxpayerForm } from './taxpayer-form';

describe('TaxpayerForm', () => {
  let component: TaxpayerForm;
  let fixture: ComponentFixture<TaxpayerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxpayerForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TaxpayerForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

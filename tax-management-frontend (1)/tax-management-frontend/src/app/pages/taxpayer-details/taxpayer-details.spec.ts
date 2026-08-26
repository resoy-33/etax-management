import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxpayerDetails } from './taxpayer-details';

describe('TaxpayerDetails', () => {
  let component: TaxpayerDetails;
  let fixture: ComponentFixture<TaxpayerDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxpayerDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(TaxpayerDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxpayerList } from './taxpayer-list';

describe('TaxpayerList', () => {
  let component: TaxpayerList;
  let fixture: ComponentFixture<TaxpayerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxpayerList],
    }).compileComponents();

    fixture = TestBed.createComponent(TaxpayerList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Taxpayers } from './taxpayers';

describe('Taxpayers', () => {
  let component: Taxpayers;
  let fixture: ComponentFixture<Taxpayers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Taxpayers],
    }).compileComponents();

    fixture = TestBed.createComponent(Taxpayers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

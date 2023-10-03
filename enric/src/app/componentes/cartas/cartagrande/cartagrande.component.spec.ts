import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartagrandeComponent } from './cartagrande.component';

describe('CartagrandeComponent', () => {
  let component: CartagrandeComponent;
  let fixture: ComponentFixture<CartagrandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartagrandeComponent]
    });
    fixture = TestBed.createComponent(CartagrandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

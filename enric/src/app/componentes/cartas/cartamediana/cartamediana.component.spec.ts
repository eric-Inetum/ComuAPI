import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartamedianaComponent } from './cartamediana.component';

describe('CartamedianaComponent', () => {
  let component: CartamedianaComponent;
  let fixture: ComponentFixture<CartamedianaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartamedianaComponent]
    });
    fixture = TestBed.createComponent(CartamedianaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

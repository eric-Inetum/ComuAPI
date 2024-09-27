import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartapequenaComponent } from './cartapequena.component';

describe('CartapequenaComponent', () => {
  let component: CartapequenaComponent;
  let fixture: ComponentFixture<CartapequenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartapequenaComponent]
    });
    fixture = TestBed.createComponent(CartapequenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

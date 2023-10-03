import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToppuntosComponent } from './toppuntos.component';

describe('ToppuntosComponent', () => {
  let component: ToppuntosComponent;
  let fixture: ComponentFixture<ToppuntosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToppuntosComponent]
    });
    fixture = TestBed.createComponent(ToppuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraequiposComponent } from './barraequipos.component';

describe('BarraequiposComponent', () => {
  let component: BarraequiposComponent;
  let fixture: ComponentFixture<BarraequiposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraequiposComponent]
    });
    fixture = TestBed.createComponent(BarraequiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomcalendarioComponent } from './customcalendario.component';

describe('CustomcalendarioComponent', () => {
  let component: CustomcalendarioComponent;
  let fixture: ComponentFixture<CustomcalendarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomcalendarioComponent]
    });
    fixture = TestBed.createComponent(CustomcalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

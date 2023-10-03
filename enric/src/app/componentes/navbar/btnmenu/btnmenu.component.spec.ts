import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnmenuComponent } from './btnmenu.component';

describe('BtnmenuComponent', () => {
  let component: BtnmenuComponent;
  let fixture: ComponentFixture<BtnmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnmenuComponent]
    });
    fixture = TestBed.createComponent(BtnmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopcarosComponent } from './topcaros.component';

describe('TopcarosComponent', () => {
  let component: TopcarosComponent;
  let fixture: ComponentFixture<TopcarosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopcarosComponent]
    });
    fixture = TestBed.createComponent(TopcarosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

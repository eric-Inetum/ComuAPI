import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPrecioComponent } from './top-precio.component';

describe('TopPrecioComponent', () => {
  let component: TopPrecioComponent;
  let fixture: ComponentFixture<TopPrecioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopPrecioComponent]
    });
    fixture = TestBed.createComponent(TopPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

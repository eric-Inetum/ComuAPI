import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPuntosComponent } from './top-puntos.component';

describe('TopsComponent', () => {
  let component: TopPuntosComponent;
  let fixture: ComponentFixture<TopPuntosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopPuntosComponent]
    });
    fixture = TestBed.createComponent(TopPuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

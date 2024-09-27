import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListajugadoresComponent } from './listajugadores.component';

describe('ListajugadoresComponent', () => {
  let component: ListajugadoresComponent;
  let fixture: ComponentFixture<ListajugadoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListajugadoresComponent]
    });
    fixture = TestBed.createComponent(ListajugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

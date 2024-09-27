import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MejorfichajeComponent } from './mejorfichaje.component';

describe('MejorfichajeComponent', () => {
  let component: MejorfichajeComponent;
  let fixture: ComponentFixture<MejorfichajeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MejorfichajeComponent]
    });
    fixture = TestBed.createComponent(MejorfichajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

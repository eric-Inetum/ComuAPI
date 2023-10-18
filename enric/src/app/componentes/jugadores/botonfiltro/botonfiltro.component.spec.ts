import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonfiltroComponent } from './botonfiltro.component';

describe('BotonfiltroComponent', () => {
  let component: BotonfiltroComponent;
  let fixture: ComponentFixture<BotonfiltroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotonfiltroComponent]
    });
    fixture = TestBed.createComponent(BotonfiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

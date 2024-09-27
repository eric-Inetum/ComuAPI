import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';


@Component({
  selector: 'app-botonfiltro',
  templateUrl: './botonfiltro.component.html',
  styleUrls: ['./botonfiltro.component.css'],
  animations: [
    trigger('slideInOut', [
      state('out', style({ transform: 'translateY(0)' })),
      state('in', style({ transform: 'translateY(0)' })),
      transition('out => in', animate('300ms ease-in')),
      transition('in => out', animate('300ms ease-out')),
    ]),
  ],
})
export class BotonfiltroComponent {
  selected: boolean = false;
  animationState = 'out';

  toggleMenuFn() {
    this.selected = !this.selected;
    this.animationState = this.selected ? 'in' : 'out';
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.toState === 'out') {
      // Oculta el menú completamente después de la animación de cierre
      this.selected = false;
    }
  }
}

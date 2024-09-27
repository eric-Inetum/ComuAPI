import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-btnmenu',
  templateUrl: './btnmenu.component.html',
  styleUrls: ['./btnmenu.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(100%)' })),
      transition('out => in', animate('300ms ease-in')),
      transition('in => out', animate('300ms ease-out')),
    ]),
  ],
})
export class BtnmenuComponent {
  isMenuOpen = false;
  animationState = 'out';
  showImage = false; // Agregar esta propiedad para controlar la visibilidad de la imagen

  toggleMenuFn() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.animationState = 'in'; // Abrir el menú
      this.showImage = true; // Mostrar la imagen cuando el menú está abierto
    } else {
      this.animationState = 'out'; // Cerrar el menú
      // No es necesario ocultar la imagen aquí; se ocultará cuando se complete la animación de cierre
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.animationState = 'out';
    this.showImage = false; // Ocultar la imagen cuando se cierra el menú
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.toState === 'out') {
      // Oculta el menú completamente después de la animación de cierre
      this.isMenuOpen = false;
    }
  }
}

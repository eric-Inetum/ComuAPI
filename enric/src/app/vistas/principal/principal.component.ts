import { Component } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  title = 'enric';
  saludo = 'hola';
  selected: Date | null;

  constructor() {
    this.selected = null; // Asigna un valor en el constructor
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'enric';
  saludo = 'hola';
  selected: Date | null;

  constructor() {
    this.selected = null; // Asigna un valor en el constructor
  }
  
}

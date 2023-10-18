import { Component } from '@angular/core';
import { httpClientService } from 'src/app/services/mercado/http-client.service';

@Component({
  selector: 'app-mejorfichaje',
  templateUrl: './mejorfichaje.component.html',
  styleUrls: ['./mejorfichaje.component.css'],
})
export class MejorfichajeComponent {
  nombre: string = '';
  precio: string = '';
  mediaSofascore: number = 0;
  mediaPuntos: number = 0;
  nombreEquipo: string = '';
  urlEquipo: string = '';
  urlImagenJugador: string = '';
  totalPuntos: number = 0;
  posicion: string = '';

  constructor(private httpClientService: httpClientService) {}

  ngOnInit(): void {
    this.buscarMejorJugador();
  }

  private buscarMejorJugador(): void {
    this.httpClientService.recibirMejorJugador().subscribe({
      next: (data) => {
        this.nombre = data.jugadores[0].nombre;
        this.precio = this.formatearNumeroConSeparadores(
          data.jugadores[0].valor_mercado
        );
        this.totalPuntos = data.jugadores[0].total_puntos;
        this.mediaSofascore = data.jugadores[0].media_sofascore;
        this.mediaPuntos = data.jugadores[0].media_puntos;
        this.nombreEquipo = data.jugadores[0].equipo;
        this.posicion = data.jugadores[0].posicion;
        this.urlImagenJugador = data.jugadores[0].foto;
        this.nombreEquipo = this.nombreEquipo.toLowerCase();
        this.nombreEquipo = this.nombreEquipo.replace("í", "i").replace("á", "a").replace("é", "e").replace("las ", "").replace("real ", "").replace(" vallecano", "").replace(" de madrid", "");
        this.urlEquipo = `../../../assets/escudos/${this.nombreEquipo}.png`
      },
      error: (error) => console.log(error),
      complete: () => console.log('Petición realizada correctamente'),
    });
  }

  formatearNumeroConSeparadores(numero: string) {
    // Convierte el número a una cadena y reviértelo para facilitar la inserción de puntos
    const numeroComoCadena = numero.toString().split('').reverse().join('');

    // Utiliza una expresión regular para agregar puntos cada 3 dígitos
    const numeroFormateado = numeroComoCadena
      .replace(/(\d{3})/g, '$1.')
      .split('')
      .reverse()
      .join('');

    return numeroFormateado;
  }
}

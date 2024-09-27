import { Component, Input } from '@angular/core';
import { httpClientService } from 'src/app/services/mercado/http-client.service';

@Component({
  selector: 'app-cartamediana',
  templateUrl: './cartamediana.component.html',
  styleUrls: ['./cartamediana.component.css'],
})
export class CartamedianaComponent {
  id: string = '';
  nombre: string = '';
  equipo: string = '';
  posicion: string = '';
  puntos: string = '';
  precio: string = '';
  media_puntos: string = '';
  media_sofascore: string = '';
  foto: string = '';
  escudo: string = '';
  navbarSearched = false;
  data2: any;
  playerFinded = false;
  @Input() indice: number = 0;
  @Input() data: any[] = [];

  constructor(private httpClientService: httpClientService) {}

  ngOnInit(): void {
    // hacer aqui el bucle creo recogiendo de la url "http://10.228.64.253/api/v1/jugadores?oferta_minima=notNull" el count para
    // saber cuantas veces se ejecuta el bucle y hacer que en la linea de abajo dentro del parentesis pase por parametro la i
    this.buscarJugadores(this.indice, this.data);
  }

  sendInput() {
    // recojo el texto a buscar y un booleano que dice si se ha buscado algo
    
    this.playerFinded = true;
    var data = [this.playerFinded + "", this.nombre];
    console.log(data)
    // en la linea de abajo enviamos el bo oleano en true al componente cartaMediana i el nombre escrito en el
    this.httpClientService.sendDataToOtherComponents(data);
    return false;
  }
  private buscarJugadores(indice: number, data: any[]): void {
    this.id = data[indice].id_jugador;
    this.nombre = data[indice].nombre;
    this.equipo = data[indice].equipo;
    this.posicion = data[indice].posicion;
    this.puntos = data[indice].total_puntos;
    this.precio = data[indice].valor_mercado;
    this.media_puntos = data[indice].media_puntos;
    this.media_sofascore = data[indice].media_sofascore;
    this.foto = data[indice].foto;
    this.equipo = this.equipo.toLowerCase();
    this.equipo = this.equipo
      .replace('í', 'i')
      .replace('á', 'a')
      .replace('é', 'e')
      .replace('las ', '')
      .replace('real ', '')
      .replace(' vallecano', '')
      .replace(' de madrid', '');
    this.escudo = '../../../../assets/escudos/' + this.equipo + '.png';
  }
}

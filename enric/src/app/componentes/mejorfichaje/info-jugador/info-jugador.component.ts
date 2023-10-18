import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { httpClientService } from 'src/app/services/mercado/http-client.service';

export interface PeriodicElement {
}


@Component({
  selector: 'app-info-jugador',
  templateUrl: './info-jugador.component.html',
  styleUrls: ['./info-jugador.component.css']
})

export class InfoJugadorComponent {
  propietario: string = '';
  posicion: string = '';
  lesion: string = '';
  partidosJugados: string = "";
  rankingGeneral: number = 0;
  rankingPosicion: number = 0;
  rankingEquipo: number = 0;
  valorMercado: string = '';
  totalPuntos: number = 0;
  mediaSofascore: number = 0;
  mediaPuntos: number = 0;
  ofertaMinima: string = '';

  navbarDatos = [];
  isInputSearched: String = '';
  apiCallData : any;

  constructor(private httpClientService: httpClientService,private router: Router) {}

  ngOnInit(): void {
    // hacer aqui el bucle creo recogiendo de la url "http://10.228.64.253/api/v1/jugadores?oferta_minima=notNull" el count para
    // saber cuantas veces se ejecuta el bucle y hacer que en la linea de abajo dentro del parentesis pase por parametro la i
    this.inputSearched();
    console.log(this.isInputSearched)
    if(this.isInputSearched != "true") {
      this.buscarMejorJugador();   
    }
  }


  inputSearched() {      

    // metodo para recibir los dos parametros ( booleano i nombre personaje ) por array y guardar los valores a traves de las posiciones del array
    this.httpClientService.data$.subscribe((data) => {
      this.isInputSearched = data[0];
      var nameToSearch: string = data[1];
      if ( this.isInputSearched === 'true' ) {
        this.httpClientService.jugadoresByName(nameToSearch).subscribe((data) => {
          this.apiCallData = data;
          this.apiCallSearch();
        });
        
      }

    });

  }

  apiCallSearch() {
    var requests = [];
    for (let i = 0; i < this.apiCallData.jugadores.length; i++) {
      requests.push(this.httpClientService.jugadoresByName(this.apiCallData.jugadores[i].nombre));
      }
    
      forkJoin(requests).subscribe(responses => {
        responses.forEach((data, index) => {
          this.propietario = data.jugadores[index].propietario;
          this.posicion = data.jugadores[index].posicion;
          this.lesion = data.jugadores[index].lesion;
          this.partidosJugados = data.jugadores[index].partidos_jugados;
          this.rankingGeneral = data.jugadores[index].ranking_general;
          this.rankingPosicion = data.jugadores[index].ranking_posicion;
          this.rankingEquipo = data.jugadores[index].ranking_equipo;
          this.valorMercado = data.jugadores[index].valor_mercado;
          this.totalPuntos = data.jugadores[index].total_puntos;
          this.mediaSofascore = data.jugadores[index].media_sofascore;
          this.mediaPuntos = data.jugadores[index].media_puntos;
          this.ofertaMinima = data.jugadores[index].oferta_minima;
          
        });
      });
}

  

  private buscarMejorJugador(): void {
    this.httpClientService.recibirMejorJugador().subscribe({
      next: (data) => {
        this.propietario = data.jugadores[0].propietario;
        this.posicion = data.jugadores[0].posicion;
        this.lesion = data.jugadores[0].lesion;
        this.partidosJugados = data.jugadores[0].partidos_jugados;
        this.rankingGeneral = data.jugadores[0].ranking_general;
        this.rankingPosicion = data.jugadores[0].ranking_posicion;
        this.rankingEquipo = data.jugadores[0].ranking_equipo;
        this.valorMercado = this.formatearNumeroConSeparadores(
          data.jugadores[0].valor_mercado
        );
        
        this.totalPuntos = data.jugadores[0].total_puntos;
        this.mediaSofascore = data.jugadores[0].media_sofascore;
        this.mediaPuntos = data.jugadores[0].media_puntos;
        this.ofertaMinima = this.formatearNumeroConSeparadores(
          data.jugadores[0].oferta_minima
        );
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


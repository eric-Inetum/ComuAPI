import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { httpClientService } from 'src/app/services/mercado/http-client.service';



@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent {
  id: number = 0;
  nombre: string = '';
  precio: string = '0';
  mediaSofascore: number = 0;
  mediaPuntos: number = 0;
  nombreEquipo: string = '';
  urlEquipo: string = '';
  urlImagenJugador: string = '';
  totalPuntos: number = 0;
  posicion: string = '';

    
  navbarDatos = [];
  isInputSearched: String = '';
  apiCallData : any;

  constructor(private httpClientService: httpClientService,private router: Router) {}

  ngOnInit(): void {
    // hacer aqui el bucle creo recogiendo de la url "http://10.228.64.253/api/v1/jugadores?oferta_minima=notNull" el count para
    // saber cuantas veces se ejecuta el bucle y hacer que en la linea de abajo dentro del parentesis pase por parametro la i
    this.inputSearched();   
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
          this.id = data.jugadores[index].id_jugador;
          this.nombre = data.jugadores[index].nombre; 
          if(data.jugadores[index].equipo.toLowerCase().startsWith("real ")) {
            this.nombreEquipo = data.jugadores[index].equipo.toLowerCase().split(" ")[1];
          }else {
          this.nombreEquipo = data.jugadores[index].equipo.toLowerCase().split(" ")[0];
          }
          this.posicion = data.jugadores[index].posicion;
          this.totalPuntos = data.jugadores[index].total_puntos;
          this.precio = data.jugadores[index].valor_mercado;
          this.mediaPuntos = data.jugadores[index].media_puntos;
          this.mediaSofascore = data.jugadores[index].media_sofascore;
          this.urlImagenJugador = "https://www.comuniate.com/caras3/" + data.jugadores[index].id_jugador + ".png";          
        });
        console.log(this.urlImagenJugador)
      });
      this.router.navigate(['/jugador', this.nombre, this.id]);

}

}

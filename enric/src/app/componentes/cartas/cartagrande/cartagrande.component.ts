import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { httpClientService } from 'src/app/services/mercado/http-client.service';

@Component({
  selector: 'app-cartagrande',
  templateUrl: './cartagrande.component.html',
  styleUrls: ['./cartagrande.component.css'],
})
export class CartagrandeComponent {
  @Input() id = 0;
  @Input() nombre = '';
  @Input() precio = '';
  @Input() mediaSofascore = 0;
  @Input() mediaPuntos = 0;
  @Input() nombreEquipo = '';
  @Input() urlEquipo = '';
  @Input() urlImagenJugador = '';
  @Input() totalPuntos = 0;
  @Input() posicion = '';

  navbarDatos = [];
  isInputSearched: String = '';
  apiCallData: any;

  constructor(
    private httpClientService: httpClientService,
    private router: Router
  ) {}

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
      if (this.isInputSearched === 'true') {
        this.httpClientService
          .jugadoresByName(nameToSearch)
          .subscribe((data) => {
            this.apiCallData = data;
            this.apiCallSearch();
          });
      }
    });
  }

  apiCallSearch() {
    var requests = [];
    for (let i = 0; i < this.apiCallData.jugadores.length; i++) {
      requests.push(
        this.httpClientService.jugadoresByName(
          this.apiCallData.jugadores[i].nombre
        )
      );
    }

    forkJoin(requests).subscribe((responses) => {
      responses.forEach((data, index) => {
        this.id = data.jugadores[index].id_jugador;
        this.nombre = data.jugadores[index].nombre;
        this.nombreEquipo = this.nombreEquipo.toLowerCase();
        this.nombreEquipo = this.nombreEquipo
          .replace('í', 'i')
          .replace('á', 'a')
          .replace('é', 'e')
          .replace('las ', '')
          .replace('real ', '')
          .replace(' vallecano', '')
          .replace(' de madrid', '');
        this.posicion = data.jugadores[index].posicion;
        this.totalPuntos = data.jugadores[index].total_puntos;
        this.precio = data.jugadores[index].valor_mercado;
        this.mediaPuntos = data.jugadores[index].media_puntos;
        this.mediaSofascore = data.jugadores[index].media_sofascore;
        this.urlImagenJugador = data.jugadores[index].foto;
      });
      this.router.navigate(['/jugador', this.nombre, this.id]);
    });
  }
}

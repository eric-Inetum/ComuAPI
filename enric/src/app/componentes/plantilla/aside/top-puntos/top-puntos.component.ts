import { Component, Input, OnInit } from '@angular/core';
import { httpClientService } from '../../../../services/mercado/http-client.service';

@Component({
  selector: 'app-top-puntos',
  templateUrl: './top-puntos.component.html',
  styleUrls: ['./top-puntos.component.css']
})
export class TopPuntosComponent {
  @Input() titulo: string | undefined;
  @Input() rutaCartaHijo: string | undefined;

  jugadores: any[] = [];
  contadorArray: any[] = [];

  constructor(private httpClientService: httpClientService) { }

  ngOnInit() {
    //hacer api key automatica
  
    // Realizar una solicitud HTTP a la URL
    this.httpClientService.jugadoresOrderByPointsOfMarket().
      subscribe(response => {
        // Obtener la longitud de la lista de jugadores en la respuesta JSON
        this.jugadores = response.jugadores.slice(0, 3);
        console.log(this.jugadores);
      });
  }
}

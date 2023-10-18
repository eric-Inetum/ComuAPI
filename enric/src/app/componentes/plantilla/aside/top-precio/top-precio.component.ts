import { Component, Input, OnInit } from '@angular/core';
import { httpClientService } from '../../../../services/mercado/http-client.service';

@Component({
  selector: 'app-top-precio',
  templateUrl: './top-precio.component.html',
  styleUrls: ['./top-precio.component.css'],
})
export class TopPrecioComponent {
  jugadoresMasCaros: any[] = [];
  @Input() titulo: string | undefined;
  @Input() query: string | undefined;
  @Input() rutaCartaHijo: string | undefined;

  constructor(private httpClientService: httpClientService) {}

  ngOnInit() {
    // Realizar una solicitud HTTP a la URL
    this.httpClientService
      .jugadoresOrderByPriceOfMarket()
      .subscribe((response) => {

        // Tomar los 3 primeros jugadores (los 3 mas caros)
        this.jugadoresMasCaros = response.jugadores.slice(0, 3);
        console.log(this.jugadoresMasCaros);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { httpClientService } from '../../../services/mercado/http-client.service';

@Component({
  selector: 'app-listajugadores',
  templateUrl: './listajugadores.component.html',
  styleUrls: ['./listajugadores.component.css']
})
export class ListajugadoresComponent {
  jugadores: any[] = [];
  contadorArray: any[] = [];
  i: number = 1;
  length: number = 1;
  page: number = 1;
  

  constructor(private httpClientService: httpClientService) { }

  
  ngOnInit() {
    this.getLength();
    this.getJugadoresPag(this.page);
  }

    getLength() {
      this.httpClientService.recibirJugadores().subscribe(response => {
        this.length = response.jugadores.length;
        console.log(this.length)
      });
    }
    getJugadoresPag(page:number) {
          //hacer api key automatica
      // Realizar una solicitud HTTP a la URL
      console.log(page)
      this.httpClientService.recibirJugadoresPag(page).
      subscribe(response => {
        if (response.jugadores.length <= 0) {
          this.prevPage();
        }
        else{
          this.jugadores = response.jugadores;
          this.contadorArray = new Array(this.jugadores.length);
          console.log(response)
        }
      });
    }

    prevPage() {
      if (this.page != 1 ) {
        this.page -= 1;
        this.getJugadoresPag(this.page);
      }
    }
  
    nextPage() {
      this.page += 1;
      this.getJugadoresPag(this.page);
    }
    
  }


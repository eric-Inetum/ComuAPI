import { Component, Input } from '@angular/core';
import { httpClientService } from 'src/app/services/mercado/http-client.service';

@Component({
  selector: 'app-cartapequena',
  templateUrl: './cartapequena.component.html',
  styleUrls: ['./cartapequena.component.css']
})
export class CartapequenaComponent {
  @Input() rutaCartaNieto: String | undefined
  id: string = '';
  nombre: string = '';
  playerFinded = false;
  foto: string = '';
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
        this.foto = data[indice].foto;
  }
}

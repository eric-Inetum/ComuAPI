import { Component } from '@angular/core';
import { httpClientService } from 'src/app/services/mercado/http-client.service';

@Component({
  selector: 'app-barrabusqueda',
  templateUrl: './barrabusqueda.component.html',
  styleUrls: ['./barrabusqueda.component.css']
})


export class BarrabusquedaComponent {
  constructor(private services: httpClientService) { }
  
  data: any;
  navbarSearched = false;

  sendInput() {
    // recojo el texto a buscar y un booleano que dice si se ha buscado algo
    var name = document.forms[0]['searchInput'].value;
    
    this.navbarSearched = true;
    var data = [this.navbarSearched + "", name];
    console.log(data)
    // en la linea de abajo enviamos el booleano en true al componente cartaMediana i el nombre escrito en el
    this.services.sendDataToOtherComponents(data);
    return false;
  }


}


 



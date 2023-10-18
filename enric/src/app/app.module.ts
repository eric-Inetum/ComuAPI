import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar'; // Importa MatToolbarModule
import { MatMenuModule } from '@angular/material/menu'; // Importa MatMenuModule
import {MatGridListModule} from '@angular/material/grid-list';


import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule, routingComponents } from "./app-routing.module";


import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/plantilla/navbar/navbar.component';
import { BarrabusquedaComponent } from './componentes/plantilla/navbar/barrabusqueda/barrabusqueda.component';
import { BtnmenuComponent } from './componentes/plantilla/navbar/btnmenu/btnmenu.component';
import { AsideComponent } from './componentes/plantilla/aside/aside.component';
import { CartapequenaComponent } from './componentes/cartas/cartapequena/cartapequena.component';
import { CartamedianaComponent } from './componentes/cartas/cartamediana/cartamediana.component';
import { CartagrandeComponent } from './componentes/cartas/cartagrande/cartagrande.component';
import { BarraequiposComponent } from './componentes/plantilla/barraequipos/barraequipos.component';
import { MejorfichajeComponent } from './componentes/mejorfichaje/mejorfichaje.component';
import { MercadoComponent } from './componentes/mercado/mercado.component';
import { FooterComponent } from './componentes/plantilla/footer/footer.component';
import { TopPuntosComponent } from './componentes/plantilla/aside/top-puntos/top-puntos.component';
import { CustomcalendarioComponent } from "./componentes/plantilla/aside/customcalendario/customcalendario.component";
import { PlantillaComponent } from "./componentes/plantilla/plantilla.component";
import { PrincipalComponent } from "./vistas/principal/principal.component";
import { JugadoresComponent } from "./vistas/jugadores/jugadores.component";
import { EquipoComponent } from "./vistas/equipo/equipo.component";
import { BotonfiltroComponent } from "./componentes/jugadores/botonfiltro/botonfiltro.component";
import { ListajugadoresComponent } from "./componentes/jugadores/listajugadores/listajugadores.component";
import { PaginadoComponent } from "./componentes/jugadores/paginado/paginado.component";
import { httpClientService } from "./services/mercado/http-client.service";
import { HttpClientModule } from '@angular/common/http';
import { InfoJugadorComponent } from "./componentes/mejorfichaje/info-jugador/info-jugador.component";
import { JugadorComponent } from "./vistas/jugador/jugador.component";
import { TopPrecioComponent } from './componentes/plantilla/aside/top-precio/top-precio.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BarrabusquedaComponent,
    BtnmenuComponent,
    AsideComponent,
    CartapequenaComponent,
    CartamedianaComponent,
    CartagrandeComponent,
    BarraequiposComponent,
    MejorfichajeComponent,
    MercadoComponent,
    FooterComponent,
    TopPuntosComponent,
    CustomcalendarioComponent,
    PlantillaComponent,
    PrincipalComponent,
    JugadoresComponent,
    EquipoComponent,
    BotonfiltroComponent,
    ListajugadoresComponent,
    PaginadoComponent,
    InfoJugadorComponent,
    JugadorComponent,
    TopPrecioComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatMenuModule, // Asegúrate de haber importado MatMenuModule
    MatIconModule, // Asegúrate de importar MatIconModule
    MatGridListModule,
    AppRoutingModule,
    HttpClientModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


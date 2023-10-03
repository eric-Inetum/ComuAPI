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


import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { BarrabusquedaComponent } from './componentes/navbar/barrabusqueda/barrabusqueda.component';
import { BtnmenuComponent } from './componentes/navbar/btnmenu/btnmenu.component';
import { AsideComponent } from './componentes/aside/aside.component';
import { CalendarioComponent } from './componentes/aside/calendario/calendario.component';
import { ToppuntosComponent } from './componentes/aside/toppuntos/toppuntos.component';
import { TopcarosComponent } from './componentes/aside/topcaros/topcaros.component';
import { CartapequenaComponent } from './componentes/cartas/cartapequena/cartapequena.component';
import { CartamedianaComponent } from './componentes/cartas/cartamediana/cartamediana.component';
import { CartagrandeComponent } from './componentes/cartas/cartagrande/cartagrande.component';
import { BarraequiposComponent } from './componentes/barraequipos/barraequipos.component';
import { MejorfichajeComponent } from './componentes/mejorfichaje/mejorfichaje.component';
import { MercadoComponent } from './componentes/mercado/mercado.component';
import { FooterComponent } from './componentes/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BarrabusquedaComponent,
    BtnmenuComponent,
    AsideComponent,
    ToppuntosComponent,
    TopcarosComponent,
    CartapequenaComponent,
    CartamedianaComponent,
    CartagrandeComponent,
    BarraequiposComponent,
    MejorfichajeComponent,
    MercadoComponent,
    FooterComponent,
    CalendarioComponent
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
    MatGridListModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


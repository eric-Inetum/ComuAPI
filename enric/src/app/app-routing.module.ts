import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { PrincipalComponent} from './vistas/principal/principal.component'
import { JugadoresComponent } from './vistas/jugadores/jugadores.component';
import { EquipoComponent } from './vistas/equipo/equipo.component';
import { JugadorComponent } from './vistas/jugador/jugador.component';


const routes: Routes = [
  {path:'', redirectTo:'principal', pathMatch:'full'},
  {path:'principal', component:PrincipalComponent},
  {path:'jugadores', component:JugadoresComponent},
  {path:'equipo', component:EquipoComponent},
  {path:`jugador/:nombre/:id`, component:JugadorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { 

  
}
export const routingComponents = [PrincipalComponent, JugadoresComponent, EquipoComponent]
function ngOnInit() {
  throw new Error('Function not implemented.');
}


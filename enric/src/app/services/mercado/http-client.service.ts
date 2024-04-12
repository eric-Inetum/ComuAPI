import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class httpClientService {
  access_token: string = '';
  constructor(private httpClient: HttpClient) {}
  private dataSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public data$ = this.dataSubject.asObservable();
  
  
  public recibirMercado(): Observable<any> {
    return this.httpClient.get<any>(
      'http://10.228.64.163/api/v3/jugadores?oferta_minima=notNull'
    );
  }

  public recibirJugadores(): Observable<any> {
    return this.httpClient.get<any>(
      'http://10.228.64.163/api/v3/jugadores'
    );
  }


  sendDataToOtherComponents(data: string[]) {
    this.dataSubject.next(data);
  } 
  public recibirMejorJugador(): Observable<any> {
    return this.httpClient.get<any>(
      'http://10.228.64.163/api/v3/jugadores?mejor_fichaje=true'
    );
  }

  public jugadoresByName(name: string): Observable<any> {
    return this.httpClient.get<any>(
      `http://10.228.64.163/api/v3/jugadores?nombre=${name}`
    );
  }

  public jugadoresOrderByPriceOfMarket(): Observable<any> {
    return this.httpClient.get<any>(
      `http://10.228.64.163/api/v3/jugadores?&orderDescBy=valor_mercado`
    );
  }

  public jugadoresOrderByPointsOfMarket(): Observable<any> {
    return this.httpClient.get<any>(
      `http://10.228.64.163/api/v3/jugadores?&orderDescBy=total_puntos`
    );
  }

  public recibirJugadoresPag(page: number): Observable<any> {

    return this.httpClient.get<any>(

      `http://10.228.64.163/api/v3/jugadores?pag=${page}`

    );

  }

  public recibirJugadoresPagMercado(page: number): Observable<any> {

    return this.httpClient.get<any>(

      `http://10.228.64.163/api/v3/jugadores?oferta_minima=notNull&pag=${page}`

    );

  }
}

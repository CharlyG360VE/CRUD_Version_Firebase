import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'urlfiredatabase';

  constructor( private http: HttpClient ) { }

  crearHeroe( heroe: HeroeModel ){
    return this.http.post(`${this.url}/heroes.json`, heroe )
      .pipe( map( resp => {
        heroe.id = resp['name'];
        return heroe;
      } ) )
  }

  actualizarHeroe( heroe: HeroeModel ){
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp );
  }

  borrarHeroe( id: string ){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroe( id: string ){
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  getHeroes(){
    return this.http.get(`${ this.url }/heroes.json`)
      .pipe(
        map( this.crearArreglo )
      )
  }

  private crearArreglo( heroesObj: object ){
    const HEROES: HeroeModel[] = [];

    if(heroesObj === null) { return []; }

      Object.keys( heroesObj ).forEach( key => {

        const HEROE: HeroeModel = heroesObj[key]
        HEROE.id = key;

        HEROES.push( HEROE );

      } )

    return HEROES;
  }

}

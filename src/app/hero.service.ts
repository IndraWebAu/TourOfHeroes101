import { Injectable } from '@angular/core';
import { Hero } from './interfaces/hero';
import { Heroes } from './mock-heroes';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }
  getHeroes = (): Observable<Hero[]> => {
    const heroes = of(Heroes);
    return heroes;
  }

}

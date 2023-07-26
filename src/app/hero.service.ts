import { Injectable } from '@angular/core';
import { Hero } from './interfaces/hero';
import { Heroes } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }
  getHeroes = (): Hero[] => Heroes;
}

import { Injectable } from '@angular/core';
import { Hero } from './interfaces/hero';
import { Heroes } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messagesService: MessageService) { }

  getHeroes = (): Observable<Hero[]> => {
    const heroes = of(Heroes);
    this.messagesService.add('Heroes Service: Fetched heroes');
    return heroes;
  }

}

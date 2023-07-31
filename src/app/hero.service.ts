import { Injectable } from '@angular/core';
import { Hero } from './interfaces/hero';
import { Heroes } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroUrl = 'api/heroes';

  constructor(
    private messagesService: MessageService,
    private http: HttpClient) { }

  getHeroes = (): Observable<Hero[]> =>
    this.http
      .get<Hero[]>(this.heroUrl);

  getHero(id: number): Observable<Hero> {
    const hero = Heroes.find(h => h.id == id)!;
    this.log(`Hero retrieved: id=${id}`);
    return of(hero);
  }

  private log = (message: string) =>
    this.messagesService
      .add(`Message serve: ${message}`);
}

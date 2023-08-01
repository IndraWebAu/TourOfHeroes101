import { Injectable } from '@angular/core';
import { Hero } from './interfaces/hero';
import { Heroes } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

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
      .get<Hero[]>(this.heroUrl)
      .pipe(
        tap(_ => this.log('fetched heroes in tap')),
        catchError(this.handleError<Hero[]>('Get Heroes', []))
      );

  getHero(id: number): Observable<Hero> {
    const hero = Heroes.find(h => h.id == id)!;
    this.log(`Hero retrieved: id=${id}`);
    return of(hero);
  }

  private log = (message: string) =>
    this.messagesService
      .add(`Message serve: ${message}`);

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(error);
      return of(result as T);
    }
  }

}

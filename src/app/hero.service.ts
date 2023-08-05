import { Injectable } from '@angular/core';
import { Hero } from './interfaces/hero';
import { Observable, ObservedValueOf, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroUrl = 'api/heroes';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };

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
    const heroUrl = `${this.heroUrl}/${id}`;
    return this.http
      .get<Hero>(heroUrl)
      .pipe(
        tap(_ => this.log(`Fetched hero id:${id}`)),
        catchError(this.handleError<Hero>(`Get hero id ${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http
      .put<Hero>(this.heroUrl, hero, this.httpOptions)
      .pipe
      (
        tap(_ => this.log(`Updated hero id:${hero.id}`)),
        catchError(this.handleError<Hero>(`Update hero id`))
      )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>(this.heroUrl, hero, this.httpOptions)
      .pipe
      (
        tap(newHero => this.log(`Added hero id: ${newHero.id}`)),
        catchError(this.handleError<Hero>(`Add hero`))
      )
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroUrl}/${id} }`;

    return this.http
      .delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id: ${id}`)),
        catchError(this.handleError<Hero>('delete hero'))
      );
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

import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../interfaces/hero';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.less']
})
export class HeroSearchComponent {

  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  search = (name: string): void =>
    this.searchTerms.next(name);

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe
      (
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(name => this.heroService
          .searchHeroes(name))
      );
  }

}

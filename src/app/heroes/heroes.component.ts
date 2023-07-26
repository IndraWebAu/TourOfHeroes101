import { Component } from '@angular/core';
import { Heroes } from '../mock-heroes';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
export class HeroesComponent {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(
    private heroesService: HeroService,
    private messagesService: MessageService) { }

  onSelect = (hero: Hero) => {
    this.selectedHero = hero;
    this.messagesService
      .add(`Heroes component: selected hero id: ${hero.id}`);
  }


  getHeroes = () =>
    this.heroesService
      .getHeroes()
      .subscribe(response => this.heroes = response);

  ngOnInit() {
    this.getHeroes()
  }
}

import { Component } from '@angular/core';
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

  constructor(
    private heroesService: HeroService,
    private messagesService: MessageService) { }

  getHeroes = () =>
    this.heroesService
      .getHeroes()
      .subscribe(response => this.heroes = response);

  addHero = (heroName: string) => {
    if (!heroName) return;

    const name = heroName.trim();

    this.heroesService
      .addHero({ name } as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }

  ngOnInit() {
    this.getHeroes()
  }
}

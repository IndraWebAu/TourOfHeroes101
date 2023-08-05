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
    // add to Service AND local array
    this.heroesService
      .addHero({ name } as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }

  //delete from Service AND local array
  deleteHero = (hero: Hero) =>
    this.heroesService
      .deleteHero(hero.id)
      .subscribe(_ => this.heroes =
        this.heroes.filter(h => h !== hero));

  ngOnInit() {
    this.getHeroes()
  }
}

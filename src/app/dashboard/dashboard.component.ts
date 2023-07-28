import { Component } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private messagesService: MessageService) { }

  ngOnInit() {
    this.messagesService.add('Dashboard intitialized');
    this.getTopFiveHeroes();
  }

  getTopFiveHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe(
        response => this.heroes = response
          .slice(1, 5));
  }
}

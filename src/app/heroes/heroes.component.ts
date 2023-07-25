import { Component } from '@angular/core';
import { Heroes } from '../mock-heroes';
import { Hero } from '../interfaces/hero';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
export class HeroesComponent {
  heroes: Hero[] = Heroes;
}

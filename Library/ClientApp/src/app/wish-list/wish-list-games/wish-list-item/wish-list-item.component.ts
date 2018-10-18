import { Component, OnInit, Input } from '@angular/core';


import { UpcomingGamesService } from './../../upcoming-games.service';
import { UpcomingGameModel } from './../../upcoming-game.model';

@Component({
  selector: 'app-wish-list-item',
  templateUrl: './wish-list-item.component.html',
  styleUrls: ['./wish-list-item.component.css']
})
export class WishListItemComponent implements OnInit {
  @Input() upcomingGame: UpcomingGameModel;
  @Input() index: number;

  date: Date;
  dateToday: Date;
  diff: number;

  constructor(private upcomingGamesService: UpcomingGamesService) { }

  ngOnInit() {
    this.date = new Date(this.upcomingGamesService.upcomingGames[this.index].dateReleaseYear, this.upcomingGamesService.upcomingGames[this.index].dateReleaseMonth, this.upcomingGamesService.upcomingGames[this.index].dateReleaseDay);
    this.dateToday = new Date(Date.now());
    // console.log(this.dateToday);
    // console.log(this.date);
    this.diff=Math.round((this.date.getTime()-this.dateToday.getTime())/(1000*3600*24)-31);
    // this.diff = Math.round((this.date.valueOf() - this.dateToday.valueOf())/(1000*3600*24*2));
  }

  isAnnouncedRelease(){
    return this.upcomingGamesService.announcedRelease(this.index);
  }

}

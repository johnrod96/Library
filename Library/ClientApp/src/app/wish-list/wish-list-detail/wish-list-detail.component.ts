import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { AuthService } from './../../auth/auth.service';
import { Game } from './../../games/game.model';
import { GamesService } from './../../games/games.service';
import { UpcomingGamesService } from './../upcoming-games.service';
import { UpcomingGameModel } from '../upcoming-game.model';

@Component({
  selector: 'app-wish-list-detail',
  templateUrl: './wish-list-detail.component.html',
  styleUrls: ['./wish-list-detail.component.css']
})
export class WishListDetailComponent implements OnInit {
 upcomingGame: UpcomingGameModel;
 id: number;
 newGame: Game;
 date: Date;
 dateToday: Date;
 diff: number;
 release: boolean;

  constructor(private upcomingGamesService:UpcomingGamesService,
              private gamesService: GamesService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.params 
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.upcomingGame = this.upcomingGamesService.getUpcomingGame(this.id);
          this.date = new Date(this.upcomingGamesService.upcomingGames[this.id].dateReleaseYear, this.upcomingGamesService.upcomingGames[this.id].dateReleaseMonth, this.upcomingGamesService.upcomingGames[this.id].dateReleaseDay);
          this.dateToday = new Date(Date.now());
          this.diff = Math.round((this.date.getTime()-this.dateToday.getTime())/24/60/60/1000)-31;   
        }
      );
  }

  onEditGame(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteGame(){
    this.upcomingGamesService.deleteUpcomingGame(this.id);
    this.router.navigate(['/wish-list']);
  }

  onMoveToGames(){
    this.newGame = new Game(this.upcomingGame.title, this.upcomingGame.imagePath, this.upcomingGame.description, this.upcomingGame.platform, null, '');
    this.gamesService.addGame(this.newGame);
    this.upcomingGamesService.deleteUpcomingGame(this.id);
    this.router.navigate(['/wish-list']);
    // if(this.diff > 0){
    //   this.release = false;
    // }else{
    //   this.release = true;
    //   this.newGame = new Game(this.upcomingGame.title, this.upcomingGame.imagePath, this.upcomingGame.description, this.upcomingGame.platform, null, '');
    //   this.gamesService.addGame(this.newGame);
    //   this.upcomingGamesService.deleteUpcomingGame(this.id);
    //   this.router.navigate(['/wish-list']);
    // }
  }

  isAllowed(){
    return this.authService.isAuthenticated();
  }

  isAnnouncedRelease(){
    return this.upcomingGamesService.announcedRelease(this.id);
  }

}

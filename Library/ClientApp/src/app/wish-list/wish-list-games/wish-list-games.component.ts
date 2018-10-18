import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './../../auth/auth.service';
import { UpcomingGameModel } from './../upcoming-game.model';
import { UpcomingGamesService } from './../upcoming-games.service';


@Component({
  selector: 'app-wish-list-games',
  templateUrl: './wish-list-games.component.html',
  styleUrls: ['./wish-list-games.component.css']
})
export class WishListGamesComponent implements OnInit, OnDestroy {
  upcomingGames: UpcomingGameModel[];
  subscription: Subscription;

  constructor(private upcomingGameService: UpcomingGamesService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.upcomingGameService.upcomingGamesChanged
      .subscribe(
        (upcomingGames: UpcomingGameModel[]) => {
          this.upcomingGames = upcomingGames;
        }
      );
      this.upcomingGames = this.upcomingGameService.getUpcomingGames();
  }

  onAddGame(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  isAllowed(){
    return this.authService.isAuthenticated();
  }

}

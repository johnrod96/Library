import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { AuthService } from './../../auth/auth.service';
import { GamesService } from './../games.service';
import { Game } from './../game.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit{
  game: Game;
  id: number;
  indexSub: Subscription;

  constructor(private gamesService: GamesService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {     
    this.route.params 
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.game = this.gamesService.getGame(this.id);         
      
          this.indexSub = this.gamesService.indexChanged
            .subscribe((newIndex: number) => {
              this.id = newIndex;
              this.game = this.gamesService.getGame(newIndex);
            });
      });
  }
  

  onEditGame(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteGame(){
    this.gamesService.deleteGame(this.id);
    this.router.navigate(['/games']);
  }

  onReviewGame(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  isReviewedNumber(){
    return this.gamesService.isReviewedNumber(this.id);
  }

  isReviewedDetails(){
    return this.gamesService.isReviewedDetails(this.id);
  }

  isAllowed(){
    return this.authService.isAuthenticated();
  }

}

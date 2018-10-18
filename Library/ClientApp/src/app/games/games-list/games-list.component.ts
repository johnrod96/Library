import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './../../auth/auth.service';
import { GamesService } from './../games.service';
import { Game } from '../game.model';
import { Subscription } from 'rxjs/Subscription';
import { TypeaheadService } from '../typeahead.service';


@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})

export class GamesListComponent implements OnInit, OnDestroy, OnChanges {
  games: Game[];
  subscription: Subscription;
  platforms: string[] = [];
  selectedPlatform: string = '';
  placeholder: string = 'Search for games here...'; 
  @ViewChild('platformSelected') platformSelected: ElementRef;

  public typeaheadService: TypeaheadService;
  public searchStr: string = '';

  constructor(private gamesService: GamesService,
              private router: Router,
              private route: ActivatedRoute,
              public authService: AuthService,
              private http: Http) { 

                this.typeaheadService = new TypeaheadService(http);
              }

  ngOnInit() {
    this.subscription = this.gamesService.gamesChanged
      .subscribe(
        (games: Game[]) => {
          this.games = games;      
        }        
      );

      this.games = this.gamesService.getGames();
      this.typeaheadService.search(this.searchStr);
  }

  ngOnChanges(){
    this.typeaheadService.search(this.searchStr);
  }

  onNewGame(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  isAllowed(){
    return this.authService.isAuthenticated();
  }

  viewGame(event: any){
    this.gamesService.viewGame(event);
  }

}

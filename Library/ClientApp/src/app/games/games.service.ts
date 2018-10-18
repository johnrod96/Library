import { Game } from './game.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GamesService{    

    // private games: Game[] = [ new Game('Batman: Arkham Asylum', 
    //     '//images.igdb.com/igdb/image/upload/t_thumb/siat3cbfmg3hgbqrcljs.jpg', 
    //     'Using a great variety of gadgets you must make your way around the island, and the asylums halls to find and stop the joker. The game uses a 3-button combat system, but with a great number of gadget abilites which Batman can unlock. This makes for a very cinematic combat experience when fighting the Joker\'s goons', 
    //     'Xbox One', 98, 'This game is awesome!' )];

    constructor(private router: Router){}

    private allGames: Game[] = [];
    private games: Game[] = [];
    public sortedGames: Game[] = [];
    indexSelected: number;
    indexChanged = new Subject<number>();
    gamesChanged = new Subject<Game[]>();

    isReviewedNumber(index: number){
        // console.log(this.games[index].review != null);
        return (this.sortedGames[index].review != null);
    }

    isReviewedDetails(index: number){
        return this.sortedGames[index].reviewDetails != '';
    }

    getGames(){
        return this.sortedGames.slice();
    }

    setGames(games: Game[]){
        this.allGames = this.games = games;
        this.sortGames();
        this.gamesChanged.next(this.sortedGames.slice());
    }

    getGame(index: number){
        return this.sortedGames[index];
    }

    addGame(game: Game){
        this.games.push(game);
        this.sortGames();
        this.gamesChanged.next(this.sortedGames.slice());
    }

    updateGame(index: number, newGame: Game){
        this.sortedGames[index] = newGame;
        this.gamesChanged.next(this.sortedGames.slice());
    }

    deleteGame(index: number){
        this.sortedGames.splice(index, 1);
        this.gamesChanged.next(this.sortedGames.slice());
    }

    sortGames(){
        this.sortedGames =  this.games.sort((a: any, b: any) => {
              if (a.title < b.title) {
                return -1;
              } else if (a.title > b.title) {
                return 1;
              } else {
                return 0;
              }
        });
    }

    viewGame(event){
        if(event){
          this.indexSelected = this.games.indexOf(this.games.find(g => g.title === event.title));
          const routeString = '/games/' + this.indexSelected;
          this.router.navigate([routeString]);
          this.indexChanged.next(this.indexSelected);
        }
    }
}
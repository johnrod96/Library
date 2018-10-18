import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

import { AuthService } from './../auth/auth.service';
import { UpcomingGameModel } from './../wish-list/upcoming-game.model';
import { UpcomingGamesService } from './../wish-list/upcoming-games.service';
import { Game } from './../games/game.model';
import { GamesService } from './../games/games.service';


@Injectable()
export class DataStorageService{

    constructor(private gamesService: GamesService,
                private upcomingGamesService: UpcomingGamesService,
                private httpClient: HttpClient,
                private authService: AuthService){}

    storeLibrary(){
        const token = this.authService.getToken();
        const req = new HttpRequest('PUT', 
                                    'https://nng-game-library.firebaseio.com/games.json',
                                     this.gamesService.getGames(),
                                    {params: new HttpParams().set('auth', token)}
                                    );
        return this.httpClient.request(req);
    }

    loadLibrary(){
        // const token = this.authService.getToken();
        this.httpClient.get<Game[]>('https://nng-game-library.firebaseio.com/games.json', {
            observe: 'body',
            responseType: 'json'
            // params: new HttpParams().set('auth', token)
        }).map(
            (games) => {
                return games;
            }
        ).subscribe(
            (games: Game[]) => {
                this.gamesService.setGames(games);
            }
        );
    }

    storeWishList(){
        const token = this.authService.getToken();
        const req = new HttpRequest('PUT', 
                                    'https://nng-game-library.firebaseio.com/wish-list.json?',
                                     this.upcomingGamesService.getUpcomingGames(),
                                     {params: new HttpParams().set('auth', token)});
        return this.httpClient.request(req);
    }

    loadWishList(){
        // const token = this.authService.getToken();
        this.httpClient.get<UpcomingGameModel[]>('https://nng-game-library.firebaseio.com/wish-list.json?', {
            observe: 'body',
            responseType: 'json'
            // params: new HttpParams().set('auth', token)
        }).map(
            (upcomingGames) => {
                return upcomingGames;
            }
        ).subscribe(
            (upcomingGames: UpcomingGameModel[]) => {
                this.upcomingGamesService.setUpcomingGames(upcomingGames);
            }
        );
    }
}
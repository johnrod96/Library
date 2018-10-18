import { Subject } from 'rxjs/Subject';
import { UpcomingGameModel } from "./upcoming-game.model";

export class UpcomingGamesService{
    upComingGame: UpcomingGameModel;
    upcomingGamesChanged = new Subject<UpcomingGameModel[]>();

    // upcomingGames: UpcomingGameModel[] = [ 
    //     new UpcomingGameModel('Spiderman', 
    //                           'Marvel\'s Spider-Man is an upcoming action-adventure game based on the Marvel Comics .... In addition to the special edition of the game, a Limited Edition Spider-Man PS4 Pro bundle will be released on the same day as the game.',
    //                           'http://cdn1-www.playstationlifestyle.net/assets/uploads/2018/04/Screen-Shot-2018-04-25-at-1.29.14-PM-555x298.png',
    //                            'Playstation 4', 8, 19, 2018)
    // ];
    upcomingGames: UpcomingGameModel[] = [];
    

    getUpcomingGames(){
        return this.upcomingGames.slice();
    }

    setUpcomingGames(upcomingGames: UpcomingGameModel[]){
        this.upcomingGames = upcomingGames;
        this.upcomingGamesChanged.next(this.upcomingGames.slice());
    }

    getUpcomingGame(index: number){
        return this.upcomingGames[index];
    }

    addUpcomingGame(upcomingGame: UpcomingGameModel, releasedDate: {month: number, day: number, year: number}){
        // console.log('releaseDate');
        this.upComingGame = upcomingGame;
        this.upComingGame.dateReleaseMonth = releasedDate.month;
        this.upComingGame.dateReleaseDay = releasedDate.day;
        this.upComingGame.dateReleaseYear = releasedDate.year;
        this.upcomingGames.push(upcomingGame);
        this.upcomingGamesChanged.next(this.upcomingGames.slice());
    }

    updateUpcomingGame(index: number, newUpcomingGame: UpcomingGameModel, releasedDate: {month: number, day: number, year: number}){
        this.upcomingGames[index] = newUpcomingGame;
        this.upcomingGames[index].dateReleaseMonth = releasedDate.month;
        this.upcomingGames[index].dateReleaseDay = releasedDate.day;
        this.upcomingGames[index].dateReleaseYear = releasedDate.year;
        this.upcomingGamesChanged.next(this.upcomingGames.slice());
    }

    deleteUpcomingGame(index: number){
        this.upcomingGames.splice(index, 1);
        this.upcomingGamesChanged.next(this.upcomingGames.slice());
    }

    announcedRelease(index: number){
        return (this.upcomingGames[index].dateReleaseYear != null &&
                this.upcomingGames[index].dateReleaseMonth != null &&
                this.upcomingGames[index].dateReleaseDay != null);
    }
}
import { Subject } from "rxjs/Subject";
import { CompleterItem, CompleterData } from "ng2-completer";
import { Injectable } from "@angular/core";
import { Game } from './game.model';
import { Http } from '@angular/http';

@Injectable()
export class TypeaheadService extends Subject<CompleterItem[]> implements CompleterData{

    constructor(private http: Http) {
        super();
    }

    search(term: string): void {
        if (term == null || term === "") {
            return;
        }
        this.http.get('https://nng-game-library.firebaseio.com/games.json')
        .map(
            (results) => {
                var games = results.json();
                var matches = new Array<any>();
                for (var i = 0; i < games.length; i++) {
                    if (games[i].title.toLowerCase().includes(term.toLowerCase()))
                        matches.push({
                            title: games[i].title,
                            image: null,
                            description: null,
                            originalObject: ""
                    } as CompleterItem);
            } this.next(matches);
            })
        .subscribe();
    }

    cancel() { }
}

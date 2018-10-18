import { AuthService } from './../../auth/auth.service';
import { Game } from './../../games/game.model';
import { GamesService } from './../../games/games.service';
import { Search } from './../search.model';
import { SearchService } from './../search.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { SearchComponent } from './../search.component';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.css']
})
export class SearchDetailComponent implements OnInit {
  result: Search;
  id: number;

  constructor(private searchService: SearchService,
              private route: ActivatedRoute,
              private router: Router,
              private gamesService: GamesService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.result = this.searchService.getResult(this.id);
        // console.log(this.result);
      }
    );
  }

  onAddtoLibrary(){
    let game = new Game(this.result.name, this.result.imagePath, this.result.summary, '', this.result.rating, '');
    console.log(game);
    this.gamesService.addGame(game);
    this.searchService.removeResult(this.id);
    this.router.navigate(['/games'], {relativeTo: this.route});
  }

  isAllowed(){
    return this.authService.isAuthenticated();
  }

}

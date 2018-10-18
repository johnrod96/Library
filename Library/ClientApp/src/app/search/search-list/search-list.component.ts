import { Search } from './../search.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SearchService } from './../search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  results: Search[];
  subscription: Subscription;

  // subscriptionFilter: Subscription;

  constructor(private searchService: SearchService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.searchService.resultsChanged
      .subscribe(
        (results: Search[]) => {
          this.results = results;
        }        
      );
      this.results = this.searchService.results;
      // console.log(this.results);
  }

}

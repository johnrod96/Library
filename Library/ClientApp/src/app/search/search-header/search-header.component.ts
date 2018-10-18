import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from './../search.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css']
})
export class SearchHeaderComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  searchString: string;
  
  constructor(private searchService: SearchService,
              private route: ActivatedRoute,
              private router: Router){}

  ngOnInit(){

  }

  onSearch(){
    // this.searchService.search();
    // console.log(this.input.nativeElement.value);
    
    // this.searchService.clearList();
    this.searchString = this.input.nativeElement.value;
    this.searchService.search(this.searchString);
  }

  clearList(){
    this.searchService.clearList();
    this.router.navigate(['/search'], {relativeTo: this.route});
  }

}

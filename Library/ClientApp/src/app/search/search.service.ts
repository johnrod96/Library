import { Search } from './search.model';
import { Http, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class SearchService {

  results: Search[] = [];
  // temp: Search[] = [];
  resultsChanged = new Subject<Search[]>();

  userKey: string = '59a83853473e52e3a4ba232892a2a682';
  baseUrl: string = 'https://api-2445582011268.apicast.io/games/';

  constructor(private http: Http) { }

  search(queryString: string){   
    let searchType = '?search=';    
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // let proxyUrl = 'https://cryptic-headland-94862.herokuapp.com/';
    let targetUrl = this.baseUrl + searchType + queryString;
    let newUrl = proxyUrl + targetUrl;

    this.http.get(newUrl, {
    // this.http.get(targetUrl, {
      headers: new Headers({'user-key': this.userKey})
      }).subscribe(
      (response: Response) => {
        const results = response.json();
        // console.log(results);
        
        for(let result of results){
          this.http.get(proxyUrl + this.baseUrl + result.id , {
            // this.http.get(this.baseUrl + result.id , {
            headers: new Headers({'user-key' : this.userKey})
            // headers: new Headers({'user-key' : this.userKey, 'Accept' : 'application/json'})
          }).subscribe(
            (response) => {
              const data = response.json();
              const finalData = data[0];
              // console.log(finalData);
              // this.temp.push(new Search(finalData.name, finalData.summary,finalData.cover.url, finalData.total_rating));
              this.results.push(new Search(finalData.name, finalData.summary,finalData.cover.url, finalData.total_rating));
            }
          );
        }// end for loop    
        
        // for(let result of results){
        //   this.http.get(this.baseurl + result.id , {
        //     headers: new Headers({'user-key' : this.userKey})
        //   }).subscribe(
        //     (response) => {
        //       const data = response.json();
        //       const finalData = data[0];
        //       // console.log(finalData);
        //       // this.temp.push(new Search(finalData.name, finalData.summary,finalData.cover.url, finalData.total_rating));
        //       this.results.push(new Search(finalData.name, finalData.summary,finalData.cover.url, finalData.total_rating));
        //     }
        //   );
        // }// end for loop   
        
        // this.http.get(this.postRequestUrl, {
        //   headers: new Headers({'Access-Control-Allow-Origin' : '*'})
        //   }).subscribe(
        //   (response: Response) => {
        //     const results = response.json();
            // console.log(results);
            
            // for(let result of results){
            //   this.http.get(this.postRequestUrl + result.id , {
            //     headers: new Headers({'user-key' : this.userKey})
            //   }).subscribe(
            //     (response) => {
            //       const data = response.json();
            //       const finalData = data[0];
            //       // console.log(finalData);
            //       // this.temp.push(new Search(finalData.name, finalData.summary,finalData.cover.url, finalData.total_rating));
            //       this.results.push(new Search(finalData.name, finalData.summary,finalData.cover.url, finalData.total_rating));
            //     }
            //   );
            // }// end for loop  
      });      
      // console.log(this.temp); 
      // this.setResults(this.temp);
      // this.resultsChanged.next(this.results.slice());
      // console.log(this.results);
      // this.resultsChanged.next(this.results.slice());  
  }

  getResult(index: number){
    return this.results[index];
  }

  setResults(results: Search[]){
    this.results = results;
  }

  removeResult(index: number){
    this.results.splice(index, 1);
    this.resultsChanged.next(this.results.slice());
  }
  
  clearList(){
    this.results = [];
    this.resultsChanged.next(this.results.slice());
  }

}

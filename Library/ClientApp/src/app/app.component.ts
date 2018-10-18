import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DataStorageService } from './shared/data-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private dataStorageService: DataStorageService,
              private router: Router) { }

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyDbuj6JwTpU75tm-IpGjTUzcWDVKe98kq4",
      authDomain: "nng-game-library.firebaseapp.com"
    });

    this.router.navigate(['']);
    this.dataStorageService.loadLibrary();
    this.dataStorageService.loadWishList();
  }
}

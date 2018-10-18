import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService,
              private route: ActivatedRoute, private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onSaveLibrary(){
    this.dataStorageService.storeLibrary().subscribe(
      (response) => {
        console.log(response);
      }
    );
    this.dataStorageService.storeWishList().subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  onLoadLibrary(){
    this.dataStorageService.loadLibrary();
    this.dataStorageService.loadWishList();
    this.router.navigate(['/games'], {relativeTo: this.route});
  } 

  onLoadWishList(){
    this.dataStorageService.loadLibrary();
    this.dataStorageService.loadWishList();
    this.router.navigate(['/wish-list'], {relativeTo: this.route});
  } 

  onLogOut(){
    this.authService.logOut();    
    this.router.navigate(['../signin'], {relativeTo: this.route});
  }

  isAllowed(){
    return this.authService.isAuthenticated();
  }

}

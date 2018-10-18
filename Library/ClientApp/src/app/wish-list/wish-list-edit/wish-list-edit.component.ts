import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { UpcomingGamesService } from './../upcoming-games.service';


@Component({
  selector: 'app-wish-list-edit',
  templateUrl: './wish-list-edit.component.html',
  styleUrls: ['./wish-list-edit.component.css']
})
export class WishListEditComponent implements OnInit {

  id: number;
  editMode = false;
  upcomingGameForm: FormGroup;
  url: string;

  constructor(private route: ActivatedRoute,
              private upcomingGamesService: UpcomingGamesService,
              private router: Router) { }

  ngOnInit() {
    this.route.params 
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onFileChange(event){
    const reader = new FileReader();
    const file = event.target.files[0];

    // if(event.target.files && event.target.files.length){
    //   const [file] = event.target.files;
    //   reader.readAsDataURL(file);

    //   reader.onload = () => {
    //     this.gameForm.patchValue({
    //       file: reader.result
    //     })
    //   }
    //   this.cd.markForCheck();
    // }
    if(event.target.files && event.target.files[0]){
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.upcomingGameForm.patchValue({
                imagePath: reader.result
        })
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit(){
    console.log(this.upcomingGameForm.value);
    console.log(this.upcomingGameForm.value.releaseDate);
    if(this.editMode){
      this.upcomingGamesService.updateUpcomingGame(this.id, this.upcomingGameForm.value, this.upcomingGameForm.value.releaseDate);
    } else{
      this.upcomingGamesService.addUpcomingGame(this.upcomingGameForm.value, this.upcomingGameForm.value.releaseDate);
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  
  private initForm(){
    let gameTitle = '';
    let gameImagePath = '';
    let gameDescription = '';
    let gamePlatform = '';
    let gameMonth = 0;
    let gameDay = 0;
    let gameYear = 0;

    if(this.editMode){
      const game = this.upcomingGamesService.getUpcomingGame(this.id);
      gameTitle = game.title;
      gameImagePath = game.imagePath;
      gameDescription = game.description;
      gamePlatform = game.platform;
      gameMonth = game.dateReleaseMonth;
      gameDay = game.dateReleaseDay;
      gameYear = game.dateReleaseYear;
    }
    this.upcomingGameForm = new FormGroup({
      'title': new FormControl(gameTitle, Validators.required),
      'imagePath': new FormControl(gameImagePath, Validators.required),
      'description': new FormControl(gameDescription, Validators.required),
      'platform': new FormControl(gamePlatform, Validators.required),
      'releaseDate': new FormGroup({      
          'month': new FormControl(gameMonth),
          'day' : new FormControl(gameDay),
          'year': new FormControl(gameYear)
      })
    });
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { GamesService } from './../games.service';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {
  id: number;
  editMode = false;
  url: string;
  gameForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private gamesService: GamesService,
              private router: Router,
              private cd: ChangeDetectorRef) { }

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
        this.gameForm.patchValue({
                imagePath: reader.result
        })
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit(){
    console.log(this.gameForm.value);
    if(this.editMode){
      this.gamesService.updateGame(this.id, this.gameForm.value);
    } else{
      this.gamesService.addGame(this.gameForm.value);
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
    let gameReview = 0;
    let gameReviewDetails = '';

    if(this.editMode){
      const game = this.gamesService.getGame(this.id);
      gameTitle = game.title;
      gameImagePath = game.imagePath;
      gameDescription = game.description;
      gamePlatform = game.platform;
      gameReview = game.review;
      gameReviewDetails = game.reviewDetails;
    }

    this.gameForm = new FormGroup({
      'title': new FormControl(gameTitle, Validators.required),
      'imagePath': new FormControl(gameImagePath, Validators.required),
      // 'file': new FormControl(null, Validators.required),
      'description': new FormControl(gameDescription, Validators.required),
      'platform': new FormControl(gamePlatform, Validators.required),
      'review': new FormControl(gameReview, Validators.pattern(/^[0-9]+[0-9]*$/)),
      'reviewDetails': new FormControl(gameReviewDetails)
    });
  }
}

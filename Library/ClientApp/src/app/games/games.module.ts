import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GamesComponent } from './games.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GameItemComponent } from './games-list/game-item/game-item.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GamesRoutingModule } from './games-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        GameDetailComponent,
        GameEditComponent,
        GameItemComponent,
        GamesListComponent,
        GamesComponent
    ],
    imports:[
        CommonModule,        
        GamesRoutingModule,  
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        BrowserAnimationsModule
    ]
})
export class GamesModule{

}
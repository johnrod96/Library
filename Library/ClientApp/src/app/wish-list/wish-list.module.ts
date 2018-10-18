import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishListDetailComponent } from './wish-list-detail/wish-list-detail.component';
import { WishListGamesComponent } from './wish-list-games/wish-list-games.component';
import { WishListEditComponent } from './wish-list-edit/wish-list-edit.component';
import { WishListItemComponent } from './wish-list-games/wish-list-item/wish-list-item.component';
import { WishLishtRoutingModule } from './wish-list-routing.module';
import { WishListComponent } from './wish-list.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
    declarations:[
        WishListGamesComponent,
        WishListDetailComponent,
        WishListEditComponent,
        WishListItemComponent,
        WishListComponent
    ],
    imports:[ 
        CommonModule, 
        WishLishtRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class WishListModule{}
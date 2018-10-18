import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { WishListComponent } from './wish-list.component';
import { WishListEditComponent } from './wish-list-edit/wish-list-edit.component';
import { WishListDetailComponent } from './wish-list-detail/wish-list-detail.component';


const wishListRoutes: Routes= [
    { path: 'wish-list', component: WishListComponent ,children: [
        { path: 'new', component: WishListEditComponent},
        { path: ':id', component: WishListDetailComponent},
        { path: ':id/edit', component: WishListEditComponent}
    ]}
]

@NgModule({
    imports:[ RouterModule.forChild(wishListRoutes)],
    exports:[ RouterModule ]
})
export class WishLishtRoutingModule{}
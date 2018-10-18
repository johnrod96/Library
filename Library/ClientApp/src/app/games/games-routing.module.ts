import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { GameDetailComponent } from './game-detail/game-detail.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { GamesComponent } from './games.component';


const gamesRoutes: Routes = [
    { path: 'games', component: GamesComponent, children: [        
        { path: 'new', component: GameEditComponent},
        { path: ':id', component: GameDetailComponent},
        { path: ':id/edit', component: GameEditComponent}
    ]}
]
@NgModule({
    imports: [RouterModule.forChild(gamesRoutes)],
    exports: [RouterModule]
})
export class GamesRoutingModule{}
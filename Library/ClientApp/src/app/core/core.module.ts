import { SearchService } from './../search/search.service';
import { NgModule } from '@angular/core';

import { AuthService } from './../auth/auth.service';
import { GamesService } from './../games/games.service';
import { DataStorageService } from './../shared/data-storage.service';
import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UpcomingGamesService } from '../wish-list/upcoming-games.service';
import { TypeaheadService } from '../games/typeahead.service';

@NgModule({
    declarations:[
        HomeComponent,
        HeaderComponent
    ],
    imports:[
        SharedModule,
        AppRoutingModule
    ],
    exports:[
        AppRoutingModule,
        HeaderComponent,
        HomeComponent
    ],
    providers:[
        DataStorageService,
        GamesService,
        UpcomingGamesService,
        AuthService,
        SearchService,
        TypeaheadService
    ]
})
export class CoreModule{}
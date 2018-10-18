import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchComponent } from "./search.component";
import { SearchRoutingModule } from "./search-routing.module";
import { SearchDetailComponent } from './search-detail/search-detail.component';
import { SearchListComponent } from './search-list/search-list.component';
import { SearchItemComponent } from './search-list/search-item/search-item.component';
import { SearchHeaderComponent } from './search-header/search-header.component';


@NgModule({
    declarations: [
        SearchComponent,
        SearchDetailComponent,
        SearchListComponent,
        SearchItemComponent,
        SearchHeaderComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SearchRoutingModule
    ]
})
export class SearchModule{}
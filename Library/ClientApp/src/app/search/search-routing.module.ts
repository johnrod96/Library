import { SearchHeaderComponent } from './search-header/search-header.component';
import { SearchDetailComponent } from './search-detail/search-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SearchComponent } from './search.component';

const searchRoutes: Routes = [
    { path: 'search', component: SearchComponent, children: [
        {path: ':id', component: SearchDetailComponent}
    ]}
]

@NgModule({
    imports: [RouterModule.forChild(searchRoutes)],
    exports: [RouterModule]
})
export class SearchRoutingModule{

}
import { SearchComponent } from './search/search.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes =[
    { path: '', component: HomeComponent},
    { path: 'search', component: SearchComponent}
  ]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports:[RouterModule]
})
export class AppRoutingModule{

}
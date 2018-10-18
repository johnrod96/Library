import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GamesModule } from './games/games.module';
import { WishListModule } from './wish-list/wish-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { SearchModule } from './search/search.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    GamesModule,
    WishListModule,
    SharedModule,
    CoreModule,
    SearchModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

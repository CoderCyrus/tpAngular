import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuctionsComponent } from './auctions/auctions.component';

import { HttpClientModule } from '@angular/common/http'; // add HttpClient to the files

@NgModule({
  declarations: [
    AppComponent,
    AuctionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

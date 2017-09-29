import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HttpService } from "./http.service";
import { CommunicateService } from "./communicate.service";
import { BrowseComponent } from './browse/browse.component';
import { ListingComponent } from './listing/listing.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    BrowseComponent,
    ListingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [HttpService, CommunicateService],
  bootstrap: [AppComponent]
})
export class AppModule { }

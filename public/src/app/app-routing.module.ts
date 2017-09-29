import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from "./landing/landing.component";
import { BrowseComponent } from "./browse/browse.component";
import { ListingComponent } from "./listing/listing.component";

// import { HomeComponent } from './home/home.component';
// import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
    // { path: '', component: HomeComponent },
    // { path: 'about', component: AboutComponent },
    { path: '', pathMatch: "full", component: LandingComponent },
    { path: 'browse', component: BrowseComponent },
    { path: 'listings', component: ListingComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule {}

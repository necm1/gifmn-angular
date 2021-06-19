import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutModule} from "./layout/layout.module";
import {NgxMasonryModule} from "ngx-masonry";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {QuicklinkModule} from "ngx-quicklink";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    QuicklinkModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

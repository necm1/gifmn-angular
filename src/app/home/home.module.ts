import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {LayoutModule} from "../layout/layout.module";
import {NgxMasonryModule} from "ngx-masonry";
import {AnimationBuilder} from "@angular/animations";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    NgxMasonryModule,
  ]
})
/**
 * @class HomeModule
 */
export class HomeModule { }

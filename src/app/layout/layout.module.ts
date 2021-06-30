import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './component/header/header.component';
import {NavigationComponent} from './component/navigation/navigation.component';
import {ImageCardComponent} from './component/image-card/image-card.component';
import {ScrollToTopComponent} from './component/scroll-to-top/scroll-to-top.component';
import { FooterComponent } from './component/footer/footer.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [HeaderComponent, NavigationComponent, ImageCardComponent, ScrollToTopComponent, FooterComponent],
  exports: [
    HeaderComponent,
    ImageCardComponent,
    ScrollToTopComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutModule {
}

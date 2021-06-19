import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './component/header/header.component';
import {NavigationComponent} from './component/navigation/navigation.component';
import {ImageCardComponent} from './component/image-card/image-card.component';
import {ScrollToTopComponent} from './component/scroll-to-top/scroll-to-top.component';


@NgModule({
  declarations: [HeaderComponent, NavigationComponent, ImageCardComponent, ScrollToTopComponent],
  exports: [
    HeaderComponent,
    ImageCardComponent,
    ScrollToTopComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule {
}

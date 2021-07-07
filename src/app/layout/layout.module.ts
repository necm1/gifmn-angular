import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './component/header/header.component';
import {NavigationComponent} from './component/navigation/navigation.component';
import {ImageCardComponent} from './component/image-card/image-card.component';
import {ScrollToTopComponent} from './component/scroll-to-top/scroll-to-top.component';
import {FooterComponent} from './component/footer/footer.component';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {TagEditModalComponent} from './component/tag-edit-modal/tag-edit-modal.component';


@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    ImageCardComponent,
    ScrollToTopComponent,
    FooterComponent,
    TagEditModalComponent
  ],
  exports: [
    HeaderComponent,
    ImageCardComponent,
    ScrollToTopComponent,
    FooterComponent,
    TagEditModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild()
  ]
})
export class LayoutModule {
}

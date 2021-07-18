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
import {FormsModule} from '@angular/forms';
import {UploadContainerComponent} from './component/upload-container/upload-container.component';
import {TagBadgeComponent} from './component/tag-badge/tag-badge.component';
import {ImageCardPlaceholderComponent} from './component/image-card-placeholder/image-card-placeholder.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    ImageCardComponent,
    ScrollToTopComponent,
    FooterComponent,
    TagEditModalComponent,
    UploadContainerComponent,
    TagBadgeComponent,
    ImageCardPlaceholderComponent
  ],
  exports: [
    HeaderComponent,
    ImageCardComponent,
    ScrollToTopComponent,
    FooterComponent,
    TagEditModalComponent,
    UploadContainerComponent,
    TagBadgeComponent,
    ImageCardPlaceholderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    FormsModule
  ]
})
export class LayoutModule {
}

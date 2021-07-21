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
import {CategoryManagementModalComponent} from './component/category-management-modal/category-management-modal.component';
import {ModalModule} from 'ngx-bootstrap/modal';

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
    ImageCardPlaceholderComponent,
    CategoryManagementModalComponent
  ],
  exports: [
    HeaderComponent,
    ImageCardComponent,
    ScrollToTopComponent,
    FooterComponent,
    TagEditModalComponent,
    UploadContainerComponent,
    TagBadgeComponent,
    ImageCardPlaceholderComponent,
    CategoryManagementModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    FormsModule,
    ModalModule.forChild()
  ]
})
export class LayoutModule {
}

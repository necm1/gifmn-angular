import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryRoutingModule } from './gallery-routing.module';
import {ModalModule} from 'ngx-bootstrap/modal';

import { GalleryComponent } from './component/gallery.component';
import { RandomBackgroundPipe } from './pipe/random-background.pipe';
import {TagService} from '../_service/tag.service';
import {APIService} from '../_service/api.service';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [GalleryComponent, RandomBackgroundPipe],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    ModalModule.forChild(),
    TranslateModule
  ],
  providers: [
    APIService,
    TagService
  ]
})
export class GalleryModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './component/gallery.component';
import { RandomBackgroundPipe } from './pipe/random-background.pipe';

@NgModule({
  declarations: [GalleryComponent, RandomBackgroundPipe],
  imports: [
    CommonModule,
    GalleryRoutingModule
  ]
})
export class GalleryModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { ImageCardComponent } from './component/image-card/image-card.component';



@NgModule({
    declarations: [HeaderComponent, NavigationComponent, ImageCardComponent],
  exports: [
    HeaderComponent,
    ImageCardComponent
  ],
    imports: [
        CommonModule
    ]
})
export class LayoutModule { }

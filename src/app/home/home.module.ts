import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './component/home.component';
import {HomeRoutingModule} from './home-routing.module';
import {LayoutModule} from '../layout/layout.module';
import {NgxMasonryModule} from 'ngx-masonry';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TranslateModule} from '@ngx-translate/core';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    NgxMasonryModule,
    BsDropdownModule.forRoot(),
    TranslateModule.forChild(),
    InfiniteScrollModule
  ]
})
/**
 * @class HomeModule
 */
export class HomeModule {
}

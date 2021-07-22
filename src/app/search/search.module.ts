import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchRoutingModule} from './search-routing.module';
import {SearchComponent} from './components/search.component';
import {NgxMasonryModule} from 'ngx-masonry';
import {LayoutModule} from '../layout/layout.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    NgxMasonryModule,
    LayoutModule
  ]
})
export class SearchModule {
}

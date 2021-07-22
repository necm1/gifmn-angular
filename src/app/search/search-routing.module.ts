import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchComponent} from './components/search.component';
import {SearchResolver} from './resolve/search.resolver';

const routes: Routes = [
  {
    path: ':query',
    component: SearchComponent,
    resolve: {
      search: SearchResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {
}

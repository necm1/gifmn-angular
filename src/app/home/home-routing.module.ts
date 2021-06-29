import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './component/home.component';
import {CategoryResolver} from './resolver/category.resolver';
import {ItemsResolver} from './resolver/items.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      categories: CategoryResolver,
      items: ItemsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
/**
 * @class HomeRoutingModule
 */
export class HomeRoutingModule {
}

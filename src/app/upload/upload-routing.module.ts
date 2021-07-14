import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UploadComponent} from './component/upload.component';
import {CategoryResolver} from './resolver/category.resolver';

const routes: Routes = [
  {
    path: '',
    component: UploadComponent,
    resolve: {
      categories: CategoryResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule {
}

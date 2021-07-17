import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UploadComponent} from './component/upload.component';
import {CategoryResolver} from './resolver/category.resolver';
import {EditComponent} from './component/edit/edit.component';
import {PostResolver} from './resolver/post.resolver';

const routes: Routes = [
  {
    path: '',
    component: UploadComponent,
    resolve: {
      categories: CategoryResolver
    }
  },
  {
    path: ':id/edit',
    component: EditComponent,
    resolve: {
      post: PostResolver,
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

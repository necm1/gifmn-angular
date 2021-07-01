import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GalleryComponent} from './component/gallery.component';
import {PostResolver} from './resolver/post.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: GalleryComponent,
    resolve: {
      post: PostResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule {
}

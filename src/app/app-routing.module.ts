import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuicklinkStrategy} from 'ngx-quicklink';
import {NotFoundComponent} from './not-found/not-found.component';
import {UserGuard} from './_guard/user.guard';
import {GuestGuard} from './_guard/guest.guard';
import {AuthGuard} from './_guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    pathMatch: 'full',
    canActivate: [UserGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./upload/upload.module').then(m => m.UploadModule),
    canActivate: [UserGuard, AuthGuard]
  },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module').then((m) => m.GalleryModule),
    canActivate: [UserGuard]
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
    canActivate: [UserGuard]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy,
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

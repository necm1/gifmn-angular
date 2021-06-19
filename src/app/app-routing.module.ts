import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuicklinkStrategy} from "ngx-quicklink";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    pathMatch: 'full',
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

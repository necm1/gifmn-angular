import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserGuard} from '../_guard/user.guard';
import {AuthComponent} from './component/auth.component';
import {LogoutComponent} from './component/logout/logout.component';
import {GuestGuard} from '../_guard/guest.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}

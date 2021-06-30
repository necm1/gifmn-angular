import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
/**
 * @class LogoutComponent
 * @implements OnInit
 */
export class LogoutComponent implements OnInit {

  /**
   * LogoutComponent Constructor
   *
   * @constructor
   * @param authService
   * @param router
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /**
   * Handle Component Initialisation
   *
   * @public
   */
  public ngOnInit(): void {
    if (!this.authService.token) {
      this.router.navigateByUrl('404');
    }

    this.authService.clearToken();
  }

}

import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
/**
 * @class AuthComponent
 * @implements OnInit
 */
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.error(this.authService.token = 'testom');
  }

}

import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {document} from 'ngx-bootstrap/utils';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {APIService} from '../../_service/api.service';
import {APIResponse} from '../../_model/api/api-response.model';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
/**
 * @class AuthComponent
 * @implements {OnInit, OnDestroy}
 */
export class AuthComponent implements OnInit, OnDestroy {
  /**
   * @public
   * @property
   */
  public authForm: FormGroup;

  /**
   * @private
   * @property
   */
  private currentBackground: string;

  /**
   * AuthComponent Constructor
   *
   * @constructor
   * @param authService
   * @param apiService
   * @param formBuilder
   * @param router
   */
  constructor(
    private authService: AuthService,
    private apiService: APIService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  /**
   * Handle Component Initialization
   *
   * @public
   */
  public ngOnInit(): void {
    this.currentBackground = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#141518';

    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Handle Form Submit
   *
   * @public
   */
  public onSubmit(): void {
    const username = this.f.username.value;
    const password = this.f.password.value;

    if (!username || !password) {
      /*this.alertService.error(
        this.translateService.instant('HOME.FORM.INPUT.EMPTY')
      );*/
      return;
    }

    const subscription = (this.apiService
      .post<{access_token: string}>('auth', {username, password}) as Observable<APIResponse<{access_token: string}>>)
      .subscribe({
        next: response => {
          this.authService.token = (response.data as {access_token: string}).access_token;
          this.router.navigateByUrl('/');
        },
        complete: () => subscription.unsubscribe()
      });
  }

  /**
   * Handle Component Destroy
   *
   * @public
   */
  public ngOnDestroy(): void {
    document.body.style.backgroundColor = this.currentBackground;
  }

  /**
   * Get Form Controls
   *
   * @public
   * @returns {[p: string]: AbstractControl}
   */
  public get f(): { [p: string]: AbstractControl } {
    return this.authForm.controls;
  }

}

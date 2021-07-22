import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {TitleService} from '../_service/title.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
/**
 * @class NotFoundComponent
 * @implements {OnInit, OnDestroy}
 */
export class NotFoundComponent implements OnInit, OnDestroy {

  /**
   * NotFoundComponent Constructor
   *
   * @constructor
   * @param title
   * @param translate
   */
  constructor(
    private title: TitleService,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    document.getElementsByTagName('app-header')[0]?.classList.add('d-none');
    const subscription = this.translate.get('404.title').subscribe({
      next: value => this.title.set(value),
      complete: () => subscription.unsubscribe()
    });
  }


  /**
   * @public
   */
  public ngOnDestroy(): void {
    document.getElementsByTagName('app-header')[0]?.classList.remove('d-none');
  }

}

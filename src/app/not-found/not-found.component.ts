import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  constructor() { }

  public ngOnInit(): void {
    document.getElementsByTagName('app-header')[0]?.classList.add('d-none');
  }

  /**
   * @public
   */
  public ngOnDestroy(): void {
    document.getElementsByTagName('app-header')[0]?.classList.remove('d-none');
  }

}

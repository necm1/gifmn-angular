import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PostService} from '../../../_service/post.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  /**
   * @public
   * @property
   */
  @ViewChild('search')
  public searchInput: ElementRef<HTMLInputElement>;

  /**
   * @private
   * @property
   */
  private didSearch = false;

  /**
   * NavigationComponent Constructor
   *
   * @constructor
   *
   */
  constructor(
    private router: Router
  ) {
  }

  /**
   * @public
   */
  public onSearchInput(): void {
    if (this.didSearch) {
      return;
    }

    const value = this.searchInput.nativeElement.value;

    if (!value) {
      this.searchInput.nativeElement.classList.add('is-invalid');
    }

    this.router.navigate(['search', value]);
  }

  /**
   * @public
   */
  public onChange(): void {
    if (this.searchInput.nativeElement.classList.contains('is-invalid')) {
      this.searchInput.nativeElement.classList.remove('is-invalid');
    }

    if (this.didSearch) {
      this.didSearch = false;
    }
  }

}

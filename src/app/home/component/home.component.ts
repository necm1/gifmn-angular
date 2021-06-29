import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TitleService} from '../../_service/title.service';
import {NgxMasonryComponent, NgxMasonryOptions} from 'ngx-masonry';
import {APIService} from '../../_service/api.service';
import {APIResponseList} from '../../_model/api/api-response-list.model';
import {Post} from '../../_model/post/post.entity';
import {PostCategory} from '../../_model/post/post-category.entity';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
/**
 * @class HomeComponent
 * @implements OnInit
 */
export class HomeComponent implements OnInit, AfterViewInit {
  /**
   * @public
   * @property
   */
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;

  /**
   * @public
   * @property
   */
  public image: Post[] = [];

  /**
   * @public
   * @property
   */
  public categories: PostCategory[] = [];

  /**
   * @public
   * @property
   */
  public activeDropdownItem: PostCategory;

  public masonryOptions: NgxMasonryOptions = {
    percentPosition: true,
    itemSelector: '.masonry-item',
  };

  /**
   * HomeComponent Constructor
   *
   * @constructor
   * @param title
   * @param apiService
   * @param route
   */
  constructor(
    private title: TitleService,
    private apiService: APIService,
    private route: ActivatedRoute
  ) {
  }

  /**
   * @public
   */
  public ngOnInit(): void {
    const subscription = this.apiService.get('posts?page=1&limit=35').subscribe({
      next: (value: APIResponseList<Post>) => this.image = value.items,
      error: () => subscription.unsubscribe(),
      complete: () => subscription.unsubscribe()
    });

    this.categories = this.route.snapshot.data['categories'] ?? [];

    this.title.set('Startseite');

    if (!this.activeDropdownItem && this.categories.length > 0) {
      // Set first item
      this.activeDropdownItem = this.categories[0];
    }
  }

  /**
   * Handle After View Initialization
   *
   * @public
   */
  public ngAfterViewInit(): void {
    const subscription = this.masonry?.itemsLoaded.asObservable().subscribe({
      next: () => {
        setTimeout(() => {
          this.masonry?.reloadItems();
          this.masonry?.layout();
        }, 150);
      },
      complete: () => subscription.unsubscribe()
    });
  }

  /**
   * Select Category
   *
   * @public
   * @todo after selection to new request with category
   * and replace the current items with the new one
   */
  public selectCategory(item: PostCategory): void {
    this.activeDropdownItem = item;
  }
}

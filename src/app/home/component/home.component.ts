import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TitleService} from '../../_service/title.service';
import {NgxMasonryComponent, NgxMasonryOptions} from 'ngx-masonry';
import {APIService} from '../../_service/api.service';
import {APIResponseList} from '../../_model/api/api-response-list.model';
import {Post} from '../../_model/post/post.entity';
import {PostCategory} from '../../_model/post/post-category.entity';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../_service/category.service';

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
  public itemsList: APIResponseList<Post>;

  /**
   * @public
   * @property
   */
  public items: Post[] = [];

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
   * @param categoryService
   */
  constructor(
    private title: TitleService,
    private apiService: APIService,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
  }

  /**
   * @public
   */
  public ngOnInit(): void {
    this.categories = this.route.snapshot.data['categories'] ?? [];
    this.itemsList = this.route.snapshot.data['items'] ?? [];
    this.items = this.itemsList.items ?? [];

    this.title.set('Startseite');

    if (!this.activeDropdownItem && this.categories.length > 0) {
      if (!this.categoryService.category) {
        this.categoryService.category = this.categories[0];
      }

      // Set first item
      this.activeDropdownItem = this.categoryService.category;
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
   */
  public selectCategory(item: PostCategory): void {
    this.categoryService.category = item;
    this.activeDropdownItem = item;

    const subscription = this.apiService.get<Post>(
      `category/${item.id}/posts?page=1&limit=35`,
      {},
      true
    ).subscribe({
      next: response => {
        this.itemsList = response;
        this.items = response.items ?? [];
      },
      complete: () => subscription.unsubscribe()
    });
  }
}

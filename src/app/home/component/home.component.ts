import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TitleService} from '../../_service/title.service';
import {NgxMasonryComponent, NgxMasonryOptions} from 'ngx-masonry';
import {APIService} from '../../_service/api.service';
import {APIResponseList} from '../../_model/api/api-response-list.model';
import {Post} from '../../_model/post/post.entity';
import {PostCategory} from '../../_model/post/post-category.entity';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../_service/category.service';
import {Observable, Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fade', [
      state('0', style({ opacity: 1, display: 'block' })),
      state('1', style({ opacity: 0, display: 'none' })),

      transition('1 => 0', animate('450ms')),
      transition('0 => 1', animate('450ms')),
    ])
  ]
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
  @ViewChild(NgxMasonryComponent)
  public masonry: NgxMasonryComponent;

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

  /**
   * @public
   * @property
   */
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
   * @param translate
   */
  constructor(
    private title: TitleService,
    private apiService: APIService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private translate: TranslateService
  ) {
  }

  /**
   * @public
   */
  public ngOnInit(): void {
    if (this.items.length === 0) {
      for (let i = 0; i < 35; i++) {
        this.items.push({
          description: '',
          title: ''
        } as any);
      }
    }

    this.categories = this.route.snapshot.data['categories'] ?? [];
    this.itemsList = this.route.snapshot.data['items'] ?? [];
    this.items = this.itemsList.items ?? [];

    this.title.set(this.translate.instant('home.title'));

    if (!this.activeDropdownItem && this.categories.length > 0) {
      if (!this.categoryService.category) {
        this.categoryService.category = this.categories[0];
      }

      // Set first item
      this.activeDropdownItem = this.categoryService.category;
    }
  }

  public onScroll() {
    if (!this.itemsList || this.items.length === 0) {
      return;
    }

    const subscription: Subscription = (this.apiService.get<Post>(
      `category/${this.categoryService.category.id}/posts?page=${this.itemsList.meta.currentPage + 1}`,
      {},
      true
    ) as Observable<APIResponseList<Post>>).subscribe({
      next: value => {
        value.items.forEach(entry => this.items.push(entry));
        this.itemsList = value;
      },
      complete: () => subscription.unsubscribe()
    });
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

    const subscription: Subscription = (this.apiService.get<Post>(
      `category/${item.id}/posts?page=1&limit=35`,
      {},
      true
    ) as Observable<APIResponseList<Post>>).subscribe({
      next: response => {
        this.itemsList = response;
        this.items = response.items ?? [];

        for (let i = this.items.length; i < 35; i++) {
          this.items.push({
            description: '',
            title: ''
          } as any);
        }
      },
      error: () => {
        for (let i = this.items.length; i < 35; i++) {
          this.items.push({
            description: '',
            title: ''
          } as any);
        }
      },
      complete: () => subscription.unsubscribe()
    });
  }
}

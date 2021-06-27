import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TitleService} from '../../_service/title.service';
import {ImageItem} from '../../_model/image-item.interface';
import {NgxMasonryComponent, NgxMasonryOptions} from 'ngx-masonry';
import {APIService} from '../../_service/api.service';
import {APIResponseList} from '../../_model/api-response-list.model';
import {Post} from '../../_model/post.entity';

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

  public image: Post[] = [];

  /**
   * @public
   * @property
   * @todo add interface
   */
  public activeDropdownItem: any;

  /**
   * @public
   * @property
   * @todo remove fake data & add interface[]
   */
  public dropdownItems: any[] = [
    {
      id: 1,
      title: 'most viral'
    },
    {
      id: 2,
      title: 'keine ahnung'
    }
  ];

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
   */
  constructor(
    private title: TitleService,
    private apiService: APIService
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

    this.title.set('Startseite');

    if (!this.activeDropdownItem) {
      // Set first item
      this.activeDropdownItem = this.dropdownItems[0];
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
   * @todo add backend support
   * @public
   * @param id
   */
  public selectCategory(item: any): void {
    this.activeDropdownItem = item;
  }
}

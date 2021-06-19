import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TitleService} from "../../_service/title.service";
import {ImageItem} from "../../_model/image-item.interface";
import {NgxMasonryComponent, NgxMasonryOptions} from "ngx-masonry";

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

  public image: ImageItem[] = [
    {
      title: 'Video Test',
      path: 'https://i.imgur.com/yXvahyu_lq.mp4',
      created_at: '1337',
      type: 'video'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/wh1xrNQ_d.webp?maxwidth=520&shape=thumb&fidelity=high',
      created_at: '1337',
      type: 'image'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/EzEgHEN.jpeg',
      created_at: '1337',
      type: 'image'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/0Qejalj.jpeg',
      created_at: '1337',
      type: 'image'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/VYlDDFu.jpeg',
      created_at: '1337',
      type: 'image'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337',
      type: 'image'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337',
      type: 'image'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337',
      type: 'image'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337',
      type: 'image'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337',
      type: 'image'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337',
      type: 'image'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337',
      type: 'image'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337',
      type: 'image'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337',
      type: 'image'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337',
      type: 'image'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337',
      type: 'image'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/obxXAco.jpeg',
      created_at: '1337',
      type: 'image'
    }
  ];

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
  ]

  public masonryOptions: NgxMasonryOptions = {
    percentPosition: true,
    itemSelector: '.masonry-item',
  }

  /**
   * HomeComponent Constructor
   *
   * @constructor
   * @param title
   */
  constructor(private title: TitleService) {
  }

  /**
   * @public
   */
  public ngOnInit(): void {
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
    })
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

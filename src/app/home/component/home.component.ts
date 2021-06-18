import { Component, OnInit } from '@angular/core';
import {TitleService} from "../../_service/title.service";
import {ImageItem} from "../../_model/image-item.interface";
import {NgxMasonryOptions} from "ngx-masonry";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
/**
 * @class HomeComponent
 * @implements OnInit
 */
export class HomeComponent implements OnInit {
  public image: ImageItem[] = [
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/wh1xrNQ_d.webp?maxwidth=520&shape=thumb&fidelity=high',
      created_at: '1337'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/EzEgHEN.jpeg',
      created_at: '1337'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/0Qejalj.jpeg',
      created_at: '1337'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/VYlDDFu.jpeg',
      created_at: '1337'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/9C91CTr.jpeg',
      created_at: '1337'
    },
    {
      title: 'Atatürk',
      path: 'https://i.imgur.com/obxXAco.jpeg',
      created_at: '1337'
    }
  ]

  public masonryOptions: NgxMasonryOptions = {
    percentPosition: true,
    itemSelector: '.masonry-item'
  }

  /**
   * HomeComponent Constructor
   *
   * @constructor
   * @param title
   */
  constructor(private title: TitleService) { }

  /**
   * @public
   */
  public ngOnInit(): void {
    this.title.set('Startseite');
  }

}

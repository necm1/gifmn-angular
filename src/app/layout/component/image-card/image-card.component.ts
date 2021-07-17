import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Post} from '../../../_model/post/post.entity';
import {environment} from '../../../../environment';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
/**
 * @class ImageCardComponent
 */
export class ImageCardComponent implements OnInit {
  @Input('image')
  /**
   * @public
   * @property
   */
  public imageItem: Post;

  /**
   * ImageCard Component Constructor
   *
   * @constructor
   * @param ref
   */
  constructor(private ref: ElementRef) { }

  /**
   * ImageCardComponent Initialization
   *
   * @public
   */
  public ngOnInit(): void {
    this.ref.nativeElement.classList.add('card');
  }

  /**
   * @public
   * @param item
   * @param type
   * @returns string
   */
  public getEndpoint(item: string, type: string): string {
    return `${environment.app.imageEndpoint}/${item}.${type.split('/')[1]}`;
  }

  /**
   * Handle Video Load
   *
   * @public
   * @param event
   */
  public handleVideoLoad(event: any): void {
    const target = <HTMLVideoElement>event.target;
    const height = target.videoHeight;

    // Set half of the height ;)
    //target.style.height = `${(height / 5).toLocaleString()}px`;

    if (target.paused) {
      target.muted = true;
      target.play();
    }
  }
}

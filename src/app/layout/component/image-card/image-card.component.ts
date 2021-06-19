import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {ImageItem} from "../../../_model/image-item.interface";

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
  public imageItem: ImageItem;

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
   * Handle Video Load
   *
   * @public
   * @param event
   */
  public handleVideoLoad(event: any): void {
    const target = <HTMLVideoElement>event.target;
    const height = target.videoHeight;

    // Set half of the height ;)
    target.style.height = `${(height / 2).toLocaleString()}px`;
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../_model/post/post.entity';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
/**
 * @class GalleryComponent
 * @implements {OnInit, OnDestroy}
 */
export class GalleryComponent implements OnInit, OnDestroy {
  /**
   * @public
   * @property
   */
  public post: Post;

  constructor(
    private route: ActivatedRoute
  ) { }

  /**
   * Handle Component Initialisation
   *
   * @public
   */
  public ngOnInit(): void {
    this.post = this.route.snapshot.data['post'];

    document.getElementsByTagName('app-header')[0].classList.add('bg-transparent');
    document.body.classList.add('gallery-page');
  }

  /**
   * Handle Component Destroy
   *
   * @public
   */
  public ngOnDestroy(): void {
    document.getElementsByTagName('app-header')[0].classList.remove('bg-transparent');
    document.body.classList.remove('gallery-page');
  }

}

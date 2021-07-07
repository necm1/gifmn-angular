import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../_model/post/post.entity';
import {TitleService} from '../../_service/title.service';
import {environment} from '../../../environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  /**
   * @private
   * @property
   */
  private $colors: string[] = environment.tags.colors;

  constructor(
    private route: ActivatedRoute,
    private title: TitleService
  ) {
  }

  /**
   * Handle Component Initialisation
   *
   * @public
   */
  public ngOnInit(): void {
    this.post = this.route.snapshot.data['post'];

    document.getElementsByTagName('app-header')[0]?.classList.add('bg-transparent');
    document.body.classList.add('gallery-page');

    this.title.set(this.post.title);
  }

  /**
   * Handle Component Destroy
   *
   * @public
   */
  public ngOnDestroy(): void {
    document.getElementsByTagName('app-header')[0]?.classList.remove('bg-transparent');
    document.body.classList.remove('gallery-page');
  }

  /**
   * Shuffle Colors
   *
   * @public
   * @returns string[]
   */
  public getRandomizedColors(): string {
    const array: string[] = [...this.$colors];

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    // our result is always different
    // that's why we take the first index
    return array[0];
  }
}

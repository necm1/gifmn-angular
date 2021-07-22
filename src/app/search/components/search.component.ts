import {Component, OnInit} from '@angular/core';
import {Post} from '../../_model/post/post.entity';
import {ActivatedRoute, Router} from '@angular/router';
import {APIResponse} from '../../_model/api/api-response.model';
import {NgxMasonryOptions} from 'ngx-masonry';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  /**
   * @public
   * @property
   */
  public masonryOptions: NgxMasonryOptions = {
    percentPosition: true,
    itemSelector: '.masonry-item',
  };

  /**
   * @private
   * @property
   */
  private posts$: Post[] = [];

  /**
   * SearchComponent Constructor
   *
   * @constructor
   * @param route
   * @param router
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  /**
   * @public
   */
  public ngOnInit(): void {
    const response = this.route.snapshot.data['search'] as APIResponse<Post[]>;

    if (!response.data || response.data.length === 0) {
      this.router.navigateByUrl('/404');
    }

    this.posts$ = response.data;
  }

  /**
   * @public
   * @returns Post[]
   */
  public get posts(): Post[] {
    return this.posts$;
  }

}

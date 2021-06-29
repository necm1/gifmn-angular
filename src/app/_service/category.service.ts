import {Injectable} from '@angular/core';
import {APIService} from './api.service';
import {PostCategory} from '../_model/post/post-category.entity';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * @class CategoryService
 */
export class CategoryService {
  /**
   * @private
   * @property
   */
  private $currentCategory: BehaviorSubject<PostCategory>;

  /**
   * CategoryService Constructor
   *
   * @constructor
   * @param apiService
   */
  constructor(private apiService: APIService) {
    this.$currentCategory = new BehaviorSubject<PostCategory>(
      JSON.parse(localStorage.getItem('gifmn-category'))
    );
  }

  /**
   * Get Current Category
   *
   * @public
   * @returns PostCategory
   */
  public get category(): PostCategory {
    return this.$currentCategory.value;
  }

  /**
   * Set Token
   *
   * @public
   * @param value
   */
  public set category(value: PostCategory) {
    localStorage.setItem('gifmn-category', JSON.stringify(value));
    this.$currentCategory.next(value);
  }
}

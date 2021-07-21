import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {PostCategory} from '../../../_model/post/post-category.entity';
import {CategoryService} from '../../../_service/category.service';
import {Subscription} from 'rxjs';
import {AlertService} from '../../../_service/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-management-modal',
  templateUrl: './category-management-modal.component.html',
  styleUrls: ['./category-management-modal.component.scss']
})
/**
 * @class CategoryManagementModalComponent
 * @implements OnInit
 */
export class CategoryManagementModalComponent implements OnInit {
  /**
   * @public
   * @property
   */
  @ViewChild('categoryInput')
  public categoryInput: ElementRef;

  /**
   * @private
   * @property
   */
  private categories$: PostCategory[] = [];

  /**
   * @private
   * @property
   */
  private category$: PostCategory;

  /**
   * CategoryManagementModalComponent Constructor
   *
   * @constructor
   * @param categoryService
   * @param alertService
   * @param translate
   * @param alertService
   * @param translate
   * @param router
   * @param bsModalRef
   */
  constructor(
    private categoryService: CategoryService,
    private alertService: AlertService,
    private translate: TranslateService,
    private router: Router,
    public bsModalRef: BsModalRef
  ) {
  }

  /**
   * @public
   */
  public ngOnInit(): void {
    const subscription: Subscription = this.categoryService.categories().subscribe({
      next: value => this.categories$ = value,
      complete: () => subscription.unsubscribe()
    });
  }

  /**
   * Select Category
   *
   * @public
   * @param id
   */
  public onCategorySelect(id: string): void {
    if (!id) {
      // Reset
      this.category$ = undefined;
      return;
    }

    const entry = this.categories$.filter(e => e.id === Number(id));

    if (!entry || !entry[0]) {
      return;
    }

    this.category$ = entry[0];
  }

  /**
   * @public
   * @param id
   */
  public onDelete(id: number): void {
    const subscription: Subscription = this.categoryService.delete(id).subscribe({
      next: value => {
        if (value) {
          document.location.reload();
          this.alertService.success(this.translate.instant(
            'category.delete.success',
            {name: this.category?.name}));
          return;
        }

        this.alertService.error(this.translate.instant('category.delete.fail', {name: this.category?.name}));
      },
      complete: () => subscription.unsubscribe()
    });
  }

  /**
   * @public
   */
  public onCreate(): void {
    const value = this.categoryInput.nativeElement.value;

    if (!value) {
      this.alertService.error(this.translate.instant('category.create.name'));
      return;
    }

    const subscription: Subscription = this.categoryService.create(value).subscribe({
      next: () => {
        document.location.reload();
      },
      complete: () => subscription.unsubscribe()
    });
  }

  /**
   * @public
   */
  public onSave(): void {
    if (!this.category || !this.categoryInput) {
      return;
    }

    console.log(this.categoryInput.nativeElement.value);
    const value = this.categoryInput.nativeElement.value;

    if (!value) {
      return;
    }

    const subscription: Subscription = this.categoryService.update(this.category.id, value).subscribe({
      next: suc => {
        if (!suc) {
          this.alertService.error(this.translate.instant('category.update.fail', {name: this.category.name}));
          return;
        }

        this.alertService.success(
          this.translate.instant('category.update.success', {name: this.category.name})
        );
        //document.location.reload();
      },
      complete: () => subscription.unsubscribe()
    });
  }

  /**
   * Get Categories
   *
   * @public
   * @returns PostCategory[]
   */
  public get categories(): PostCategory[] {
    return this.categories$;
  }

  /**
   * Get Category
   *
   * @public
   * @returns PostCategory
   */
  public get category(): PostCategory {
    return this.category$;
  }
}

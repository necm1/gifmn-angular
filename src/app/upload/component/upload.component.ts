import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {APIService} from '../../_service/api.service';
import {UploadContainerComponent} from '../../layout/component/upload-container/upload-container.component';
import {Observable, Subscription} from 'rxjs';
import {AlertService} from '../../_service/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {TagBadgeComponent} from '../../layout/component/tag-badge/tag-badge.component';
import {Post} from '../../_model/post/post.entity';
import {APIResponse} from '../../_model/api/api-response.model';
import {UserService} from '../../_service/user.service';
import {ActivatedRoute} from '@angular/router';
import {PostCategory} from '../../_model/post/post-category.entity';
import {TitleService} from '../../_service/title.service';

export interface Attachment {
  name: string;
  description: string;
  type: string;
}

export interface Tag {
  name: string;
}

export interface RequestPost {
  category: number;
  user: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
/**
 * @class UploadComponent
 * @implements {OnInit, OnDestroy}
 */
export class UploadComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * @public
   * @property
   */
  public title: string;

  /**
   * @public
   * @property
   */
  public description: string;

  /**
   * @public
   * @property
   */
  public categorySelect: HTMLSelectElement;

  /**
   * @public
   * @property
   */
  public categories: PostCategory[] = [];

  /**
   * @private
   * @property
   */
  @ViewChild('uploadContainer', {read: ViewContainerRef})
  private container: ViewContainerRef;

  /**
   * @private
   * @property
   */
  @ViewChild('tagsContainer', {read: ViewContainerRef})
  private tagContainer: ViewContainerRef;

  /**
   * @private
   * @property
   */
  private readonly itemSubscriptionMap: Map<ComponentRef<UploadContainerComponent | TagBadgeComponent>, Subscription>;

  /**
   * @private
   * @property
   */
  private readonly itemValueMap: Map<number, { url: string; file: File; description: string }>;

  /**
   * @private
   * @property
   */
  private readonly tagsMap: Map<number, string>;

  /**
   * UploadComponent Constructor
   *
   * @constructor
   * @param apiService
   * @param factoryResolver
   * @param alertService
   * @param cdr
   * @param translate
   * @param userService
   * @param route
   * @param titleService
   */
  constructor(
    private apiService: APIService,
    private factoryResolver: ComponentFactoryResolver,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private userService: UserService,
    private route: ActivatedRoute,
    private titleService: TitleService
  ) {
    this.itemSubscriptionMap = new Map<ComponentRef<UploadContainerComponent>, Subscription>();
    this.itemValueMap = new Map<number, { url: string; file: File; description: string }>();
    this.tagsMap = new Map<number, string>();
  }

  /**
   * @public
   */
  public ngOnInit(): void {
    this.categories = this.route.snapshot.data['categories'] ?? [];

    document.getElementsByTagName('app-header')[0].classList.remove('d-flex');
    document.getElementsByTagName('app-header')[0].classList.add('d-none');
    document.body.classList.add('upload-page');
    this.titleService.set(this.translate.instant('upload.title'));
  }

  /**
   * @public
   */
  public ngAfterViewInit(): void {
    // add one container
    this.onAddContainerClick();
    this.cdr.detectChanges();
  }


  /**
   * Handle Container Click
   *
   * @public
   */
  public onAddContainerClick(): void {
    const factory = this.factoryResolver.resolveComponentFactory(UploadContainerComponent);
    const component = this.container.createComponent(factory);

    component.instance.id = this.itemSubscriptionMap.size + 1;

    this.itemSubscriptionMap.set(
      component,
      component.instance.itemSavedEvent.subscribe(value => {
        // Replace Item
        if (this.itemValueMap.get(component.instance.id)) {
          this.itemValueMap.delete(component.instance.id);
        }

        this.itemValueMap.set(component.instance.id, value);
      }, err => this.alertService.error(err))
    );
  }

  /**
   * Add Tag Component
   *
   * @public
   */
  public addTag(): void {
    const factory = this.factoryResolver.resolveComponentFactory(TagBadgeComponent);
    const component = this.tagContainer.createComponent(factory, 0);
    const elementRef = component.location.nativeElement;

    component.instance.id = this.tagsMap.size + 1;
    elementRef.classList.add('badge');
    elementRef.classList.add('rounded-5');
    elementRef.classList.add('bg-dark');
    elementRef.classList.add('c-pointer');
    elementRef.onclick = () => this.onCreatedTagClick(component);


    this.itemSubscriptionMap.set(
      component,
      component.instance.tagEmitter.subscribe(value => {
        // Replace Item
        if (this.tagsMap.get(component.instance.id)) {
          this.tagsMap.delete(component.instance.id);
        }

        this.tagsMap.set(component.instance.id, value);
      }, err => this.alertService.error(err))
    );
  }

  /**
   * @public
   */
  public onSave(): void {
    if (!this.categorySelect) {
      this.alertService.error(this.translate.instant('upload.error.category'));
      return;
    }

    if (!this.title) {
      this.alertService.error(this.translate.instant('upload.error.title'));
      return;
    }

    if (!this.itemValueMap || this.itemValueMap.size === 0) {
      this.alertService.error(this.translate.instant('upload.error.image'));
      return;
    }

    const form = new FormData();
    const attachments: Attachment[] = [];
    const tags: Tag[] = [];
    const post: RequestPost = {
      category: Number(this.categorySelect),
      user: this.userService.user.username,
      title: this.title,
      description: this.description
    };

    form.append('post', JSON.stringify(post));

    // Append Images
    this.itemValueMap.forEach(value => {
      // Append File
      form.append('images', value.file, value.file.name);

      // Add Image Description
      attachments.push({
        name: value.file.name,
        description: value.description,
        type: value.file.type
      });
    });

    if (this.tagsMap?.size > 0) {
      // Append Tags
      this.tagsMap.forEach(value => {
        // Add Tag
        tags.push({
          name: value,
        });
      });
    }

    form.append('attachments', JSON.stringify(attachments));
    form.append('tags', JSON.stringify(tags));

    const subscription = (this.apiService.post<Post>('post', form) as Observable<APIResponse<Post>>).subscribe({
      next: value => console.log(value),
      error: err => this.alertService.error(err),
      complete: () => subscription.unsubscribe()
    });
  }

  /**
   * @public
   */
  public ngOnDestroy(): void {
    document.getElementsByTagName('app-header')[0].classList.remove('d-none');
    document.getElementsByTagName('app-header')[0].classList.add('d-flex');
    document.body.classList.remove('upload-page');

    if (this.itemSubscriptionMap && this.itemSubscriptionMap.size > 0) {
      // Unsubscribe
      this.itemSubscriptionMap.forEach(value => value.unsubscribe());
    }
  }

  /**
   * @private
   * @param component
   */
  private onCreatedTagClick(component: ComponentRef<TagBadgeComponent>): void {
    if (!component.instance.text) {
      return;
    }

    // Destroy Component
    component.destroy();

    // Remove from Map
    this.tagsMap.delete(component.instance.id);
  }
}

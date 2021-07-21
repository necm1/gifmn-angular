import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef, OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Attachment, RequestPost, Tag, UploadComponent} from '../upload.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PostCategory} from '../../../_model/post/post-category.entity';
import {TitleService} from '../../../_service/title.service';
import {TranslateService} from '@ngx-translate/core';
import {Post} from '../../../_model/post/post.entity';
import {UploadContainerComponent} from '../../../layout/component/upload-container/upload-container.component';
import {TagBadgeComponent} from '../../../layout/component/tag-badge/tag-badge.component';
import {Observable, Subscription} from 'rxjs';
import {AlertService} from '../../../_service/alert.service';
import {DomSanitizer} from '@angular/platform-browser';
import {environment} from '../../../../environment';
import {AttachmentService} from '../../../_service/attachment.service';
import {PostService} from '../../../_service/post.service';
import {APIResponse} from '../../../_model/api/api-response.model';
import {PostTag} from '../../../_model/post/post-tag.entity';
import {PostAttachment} from '../../../_model/post/post-attachment.entity';
import {UserService} from '../../../_service/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
/**
 * @class EditComponent
 * @implements OnInit
 */
export class EditComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * @public
   * @property
   */
  public categories: PostCategory[];

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
  public post: Post;

  /**
   * @public
   * @property
   */
  public categorySelect: number;

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
  private readonly itemDeleteSubscriptionMap: Map<ComponentRef<UploadContainerComponent | TagBadgeComponent>, Subscription>;

  /**
   * @private
   * @property
   */
  private readonly itemValueMap: Map<number, { url: string; file: File; description: string; realId?: number }>;

  /**
   * @private
   * @property
   */
  private readonly tagsMap: Map<number, string>;

  /**
   * EditComponent Constructor
   *
   * @constructor
   * @param route
   * @param titleService
   * @param translate
   * @param factoryResolver
   * @param alertService
   * @param cdr
   * @param sanitizer
   * @param attachmentService
   * @param postService
   * @param userService
   * @param router
   */
  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService,
    private translate: TranslateService,
    private factoryResolver: ComponentFactoryResolver,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private attachmentService: AttachmentService,
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ) {
    this.itemSubscriptionMap = new Map<ComponentRef<UploadContainerComponent>, Subscription>();
    this.itemDeleteSubscriptionMap = new Map<ComponentRef<UploadContainerComponent>, Subscription>();
    this.itemValueMap = new Map<number, { url: string; file: File; description: string }>();
    this.tagsMap = new Map<number, string>();
  }

  /**
   * @public
   */
  public ngOnInit(): void {
    this.categories = this.route.snapshot.data.categories ?? [];
    this.post = this.route.snapshot.data.post;
    this.categorySelect = this.post.category.id;
    this.title = this.post.title;
    this.description = this.post.description;

    document.getElementsByTagName('app-header')[0].classList.remove('d-flex');
    document.getElementsByTagName('app-header')[0].classList.add('d-none');
    document.body.classList.add('upload-page');
    this.titleService.set(this.translate.instant('upload.edit.title', {
      title: this.post.title
    }));
  }

  /**
   * @public
   */
  public ngAfterViewInit(): void {
    this.post?.attachments.forEach(value => {
      this.onAddContainerClick({
        url: value.url,
        type: value.type
      }, value.description, value.id);
    });

    this.cdr.detectChanges();
  }

  /**
   * Handle Container Click
   *
   * @public
   * @param image
   * @param description
   * @param id
   */
  public onAddContainerClick(image?: { url: string; type: string }, description?: string, id?: number): void {
    const factory = this.factoryResolver.resolveComponentFactory(UploadContainerComponent);
    const component = this.container.createComponent(factory);

    component.instance.id = this.itemSubscriptionMap.size + 1;

    if (image) {
      component.instance.exists = true;
      component.instance.realId = id;

      component.instance.image = {
        file: {
          type: image.type
        },
        url: image.url,
      } as any;

      this.itemValueMap.set(component.instance.id, component.instance.image as any);
    }

    if (description) {
      component.instance.description = description;
    }

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

    this.itemDeleteSubscriptionMap.set(component, component.instance.itemDeleteEvent.subscribe(value => {
      // Replace Item
      if (!this.itemValueMap.get(component.instance.id)) {
        return;
      }

      if (value.exists) {
        const subscription = this.attachmentService.delete(value.url).subscribe({
          next: res => {
            if (!res) {
              return;
            }

            this.itemValueMap.delete(component.instance.id);
            component.destroy();
            this.alertService.success(this.translate.instant('upload.edit.delete', {value: value.url}));
          },
          error: err => this.alertService.error(err),
          complete: () => subscription.unsubscribe()
        });

        return;
      }

      this.itemValueMap.delete(component.instance.id);
      component.destroy();
      this.alertService.success(this.translate.instant('upload.edit.delete', {value: value.url}));
    }));
  }

  /**
   * Handle Post Save
   *
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
    const attachments: { id: number; url: string; description: string }[] = [];
    const tags: Tag[] = [];
    const post = {
      id: this.post.id,
      category: Number(this.categorySelect),
      user: this.userService.user?.username,
      title: this.title,
      description: this.description
    };

    form.append('post', JSON.stringify(post));

    const newAttachments: Attachment[] = [];

    // Append Images
    this.itemValueMap.forEach((value: { description: string; url: string; file?: any; realId?: number }) => {
      if (value.file && value.file.name) {
        // Append File
        form.append('images', value.file, value.file.name);

        newAttachments.push({
          name: value.file.name,
          description: value.description,
          type: value.file.type
        });
      }

      if ('realId' in value) {
        attachments.push({
          id: (value as any).realId,
          url: value.url,
          description: (value as any).description
        });
        return;
      }
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

    form.append('attachments', JSON.stringify(attachments.concat(newAttachments as any)));
    form.append('tags', JSON.stringify(tags));

    const subscription = this.postService.update(post.id, form).subscribe({
      next: value => this.router.navigateByUrl(`/gallery/${value.attachments[0].url}`).then(() =>
        this.alertService.success(this.translate.instant('upload.edit.success', {value: post.title}))),
      error: err => this.alertService.error(err),
      complete: () => subscription.unsubscribe()
    });
  }

  /**
   * Handle Post Delete
   *
   * @public
   */
  public onDelete(): void {
    const subscription = this.postService.delete(this.post.id).subscribe({
      next: value => {
        if (value) {
          this.router.navigateByUrl('/').then(() =>
            this.alertService.success(this.translate.instant('upload.edit.deleteState.success')));

          return;
        }

        this.alertService.error('upload.edit.deleteState.failed');
      },
      error: err => this.alertService.error(err),
      complete: () => subscription.unsubscribe()
    });
  }

  /**
   * Add Tag Component
   *
   * @public
   */
  public addTag(tag?: { id: number, name: string }): void {
    const factory = this.factoryResolver.resolveComponentFactory(TagBadgeComponent);
    const component = this.tagContainer.createComponent(factory, 0);
    const elementRef = component.location.nativeElement;

    if (tag) {
      component.instance.realId = tag.id;
      component.instance.text = tag.name;
    }

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
  public ngOnDestroy(): void {
    document.getElementsByTagName('app-header')[0].classList.remove('d-none');
    document.getElementsByTagName('app-header')[0].classList.add('d-flex');
    document.body.classList.remove('upload-page');

    if (this.itemSubscriptionMap && this.itemSubscriptionMap.size > 0) {
      // Unsubscribe
      this.itemSubscriptionMap.forEach(value => value.unsubscribe());
    }

    if (this.itemDeleteSubscriptionMap && this.itemDeleteSubscriptionMap.size > 0) {
      // Unsubscribe
      this.itemDeleteSubscriptionMap.forEach(value => value.unsubscribe());
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

  /**
   * @public
   * @returns string
   */
  public get postDescription(): string {
    return this.post.description ?? this.translate.instant('upload.add.description');
  }
}

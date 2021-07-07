import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {UserService} from '../../../_service/user.service';
import {TagService} from '../../../_service/tag.service';
import {PostTag} from '../../../_model/post/post-tag.entity';
import {AlertService} from '../../../_service/alert.service';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-layout-tag-edit-modal',
  templateUrl: './tag-edit-modal.component.html',
  styleUrls: ['./tag-edit-modal.component.scss']
})
/**
 * @class TagEditModalComponent
 * @implements OnInit
 */
export class TagEditModalComponent implements OnInit {
  /**
   * @public
   * @property
   */
  public tag: PostTag;

  /**
   * TagEditModalComponent Constructor
   *
   * @constructor
   * @param bsModalRef
   * @param userService
   * @param tagService
   * @param alertService
   * @param translate
   */
  constructor(
    public bsModalRef: BsModalRef,
    private userService: UserService,
    private tagService: TagService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {
  }

  /**
   * @public
   */
  public ngOnInit(): void {
    if (!this.isAuthenticated) {
      this.bsModalRef.hide();
      return;
    }
  }

  public onTagDelete(): void {
    if (!this.tag || !this.isAuthenticated) {
      this.bsModalRef.hide();
      return;
    }

    const subscription: Subscription = this.tagService.delete(this.tag.id).subscribe({
      next: () => this.alertService.success(this.translate.instant('tags.delete.success')),
      error: err => this.alertService.error(err),
      complete: () => {
        this.bsModalRef.hide();
        subscription.unsubscribe();
      }
    });
  }

  /**
   * @private
   * @returns boolean
   */
  private get isAuthenticated(): boolean {
    return !!this.userService.user;
  }
}

import {Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-tag-badge',
  templateUrl: './tag-badge.component.html',
  styleUrls: ['./tag-badge.component.scss']
})
export class TagBadgeComponent implements OnInit {
  /**
   * @public
   * @property
   */
  public id: number;

  /**
   * @public
   * @property
   */
  public text: string;

  @Output()
  /**
   * @public
   * @property
   */
  public tagEmitter: EventEmitter<string> = new EventEmitter<string>();

  /**
   * @public
   * @property
   */
  public hide = true;

  /**
   * @private
   * @property
   */
  @ViewChild('tag', {read: ViewContainerRef})
  private tag: ViewContainerRef;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * Handle Input Focus Out
   *
   * @public
   */
  public onInputFocusOut($event): void {
    if (!this.text) {
      return;
    }

    this.tag.element.nativeElement.style.display = 'block';
    $event.target.remove();
    this.tagEmitter.emit(this.text);
  }

}

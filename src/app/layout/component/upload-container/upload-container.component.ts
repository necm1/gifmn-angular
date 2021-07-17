import {Component, EventEmitter, HostListener, Output, SecurityContext} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {environment} from '../../../../environment';

export interface FileHandle {
  file: File;
  url: SafeUrl;
}

@Component({
  selector: 'app-upload-container',
  templateUrl: './upload-container.component.html',
  styleUrls: ['./upload-container.component.scss']
})
export class UploadContainerComponent {
  @Output() public itemSavedEvent = new EventEmitter<{ image: string; file?: File; realId?: number; description: string }>();

  @Output() public itemDeleteEvent = new EventEmitter<{url: string; exists: boolean}>();

  /**
   * @public
   */
  public exists = false;

  /**
   * @public
   * @property
   */
  public id: number;

  public realId: number;

  /**
   * @public
   * @property
   */
  public image: FileHandle;

  /**
   * @public
   * @property
   */
  public description: string;

  /**
   * UploadContainerComponent Constructor
   *
   * @constructor
   * @param sanitizer
   */
  constructor(private sanitizer: DomSanitizer) {
  }

  /**
   * Handle Video Load
   *
   * @public
   * @param event
   */
  public handleVideoLoad(event: any): void {
    const target = <HTMLVideoElement>event.target;

    if (target.paused) {
      target.muted = true;
      target.play();
    }
  }

  @HostListener('focusout')
  public onFocusOut(): void {
    if (!this.image || !this.image.file || !this.image.url || !this.image.file.type) {
      return;
    }

    if (this.exists && this.realId) {
      this.itemSavedEvent.emit({
        description: this.description,
        realId: this.realId,
        image: this.sanitizer.sanitize(SecurityContext.URL, this.image.url)
      });
      return;
    }

    this.itemSavedEvent.emit({
      image: this.sanitizer.sanitize(SecurityContext.URL, this.image.url),
      file: this.image.file,
      description: this.description
    });
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    //this.background = '#424850';
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    let file: FileHandle;

    if (evt.dataTransfer.files.length > 0) {
      const orgfile = evt.dataTransfer.files[0];
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(orgfile));

      file = {file: orgfile, url};
    }

    if (file) {
      this.image = file;
    }
  }

  /**
   * @public
   */
  public deleteAttachment(): void {
    if (!this.image?.url) {
      return;
    }

    this.itemDeleteEvent.emit({
      url: this.sanitizer.sanitize(SecurityContext.URL, this.image.url),
      exists: this.exists
    });
  }

  /**
   * @public
   * @param item
   * @param type
   * @returns string
   */
  public getEndpoint(item: SafeUrl, type: string): string {
    return `${environment.app.imageEndpoint}/${item}.${type.split('/')[1]}`;
  }

  /**
   * Handle File Dropped
   *
   * @public
   * @param file
   */
  public onFileDropped(file: FileHandle): void {
    this.image = file;
  }
}

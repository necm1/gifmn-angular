import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Pipe({
  name: 'randomBackground'
})
/**
 * @class RandomBackgroundPipe
 * @implements PipeTransform
 * @todo make shared pipe and change name
 */
export class RandomBackgroundPipe implements PipeTransform {
  /**
   * RandomBackgroundPipe Constructor
   *
   * @constructor
   * @param sanitizer
   */
  constructor(private sanitizer: DomSanitizer) {
  }

  /**
   * @public
   * @param v
   * @returns SafeStyle
   */
  public transform(v: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(v);
  }

}

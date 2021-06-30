import { Injectable } from '@angular/core';
import {environment} from '../../environment';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
/**
 * @class MetaService
 */
export class MetaService {
  private metaEntries: Map<string, string>;

  constructor(
    private translate: TranslateService
  ) {
    this.metaEntries = new Map<string, string>();
    this.setDefaultMeta();

    this.metaEntries.forEach((value: string, key: string) => {
      const existingKey = document.getElementsByTagName('meta')[key];

      if (existingKey) {
        existingKey.content = value;
        return;
      }

      const meta = document.createElement('meta');
      meta.name = key;
      meta.content = value;
      document.getElementsByTagName('head')[0].appendChild(meta);
    });
  }

  /**
   * Add Pre-Configured Meta
   *
   * @private
   */
  private setDefaultMeta(): void {

  }
}

import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * @class LanguageService
 */
export class LanguageService {
  /**
   * @private
   * @property
   */
  private languageSubject: BehaviorSubject<string>;

  /**
   * LanguageService Constructor
   *
   * @constructor
   * @param translateService
   */
  constructor(
    private translateService: TranslateService
  ) {
    const storageLang = localStorage.getItem('gifmn-lang');

    if (!storageLang) {
      localStorage.setItem('gifmn-lang', this.translateService.getBrowserLang());
    }

    this.languageSubject = new BehaviorSubject<string>(storageLang);

    // Add languages
    translateService.addLangs(['tr']);

    // Set default language
    translateService.setDefaultLang(environment.app.language.default);

    if (translateService.getLangs().indexOf(this.language) === -1) {
      this.language = environment.app.language.default;
    }

    translateService.use(this.language);
  }

  /**
   *
   * @public
   * @returns string
   */
  public getCurrentCulture(): string {
    switch (this.language) {
      case 'tr':
        return 'tr-TR';
    }
  }

  /**
   * Get Language
   *
   * @public
   * @returns string
   */
  public get language(): string {
    return this.languageSubject.value;
  }

  /**
   * Set Language
   *
   * @public
   * @param lang
   */
  public set language(lang: string) {
    this.languageSubject.next(lang);
    this.translateService.use(lang);
    localStorage.setItem('gifmn-lang', lang);
  }
}

import {Injectable} from '@angular/core';
import {INotyfNotificationOptions, Notyf, NotyfNotification} from 'notyf';

@Injectable({
  providedIn: 'root'
})
/**
 * @class AlertService
 */
export class AlertService {
  /**
   * @private
   * @property
   */
  private notyf: Notyf;

  /**
   * AlertService Constructor
   *
   * @constructor
   */
  constructor() {
    this.notyf = new Notyf();
  }

  /**
   * Create Error Alert
   *
   * @public
   * @param message
   * @returns NotyfNotification
   */
  public error(message: string | Partial<INotyfNotificationOptions>): NotyfNotification {
    if (!message) {
      return;
    }

    return this.notyf.error(message);
  }

  /**
   * @public
   * @param message
   * @returns NotyfNotification
   */
  public success(message: string | Partial<INotyfNotificationOptions>): NotyfNotification {
    if (!message) {
      return;
    }

    return this.notyf.success(message);
  }
}

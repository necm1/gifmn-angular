import { Injectable } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
/**
 * @class TitleService
 */
export class TitleService {
  /**
   * @private
   * @property
   */
  private $title: BehaviorSubject<string>

  /**
   * TitleService Constructor
   *
   * @constructor
   * @param title
   */
  constructor(private titleService: Title) {
    this.$title = new BehaviorSubject<string>(environment.title);
  }

  /**
   * Set Page Title
   *
   * @public
   * @param title
   */
  public set(title: string): void {
    title = `${environment.title} - ${title}`;

    this.$title.next(title);
    // we kinda reroll the wheel ;^)
    this.titleService.setTitle(title);
  }

  /**
   * Get Page Title
   *
   * @public
   * @return string
   */
  public get title(): string {
    return this.$title.value;
  }

  /**
   * Get Page Title as Observable
   *
   * @public
   * @returns Observable<string>
   */
  public get titleObservable(): Observable<string> {
    return this.$title.asObservable();
  }
}

import {Injectable} from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';
import {APIResponse} from '../_model/api/api-response.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**
 * @class AttachmentService
 */
export class AttachmentService {
  constructor(
    private apiService: APIService
  ) {
  }

  /**
   * Delete Attachment By URL
   *
   * @public
   * @param url
   */
  public delete(url: string): Observable<boolean> {
    return (this.apiService.del(`attachment/${url}`) as Observable<APIResponse<boolean>>).pipe(
      map(value => value.data)
    );
  }
}

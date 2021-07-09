import {ExceptionResponse} from './exception-response.model';

/**
 * @interface APIResponse<T>
 */
export interface APIResponse<T> {
  status: number;
  data?: T;
  error?: string | ExceptionResponse;
  errors?: [];
}

/**
 * @interface PostAttachment
 */
export interface PostAttachment {
  id: number;
  type: string;
  url: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

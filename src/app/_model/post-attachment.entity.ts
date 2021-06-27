/**
 * @interface PostAttachment
 */
export interface PostAttachment {
  id: number;
  type: 'image' | 'video';
  url: string;
  created_at: Date;
  updated_at: Date;
}

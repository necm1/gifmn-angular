/**
 * @interface PostAttachment
 */
export interface PostAttachment {
  id: number;
  type: 'image' | 'video';
  url: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

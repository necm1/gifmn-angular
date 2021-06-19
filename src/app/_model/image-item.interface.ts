/**
 * @interface ImageItem
 */
export interface ImageItem {
  title: string;
  path: string;
  type: 'image' | 'video';
  created_at: string;
}

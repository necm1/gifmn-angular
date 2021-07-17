import {PostTag} from './post-tag.entity';
import {PostAttachment} from './post-attachment.entity';

/**
 * @interface Post
 */
export interface Post {
  id: number;
  title: string;
  description: string;
  attachments: PostAttachment[];
  tags: PostTag[];
  created_at: Date;
  category: {
    id: number;
    name: string;
  };
}


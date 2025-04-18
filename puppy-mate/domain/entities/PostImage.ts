import { Post } from './Post';

export class PostImage {
  id: number;
  postId: number;
  imageUrl: string;
  orderIndex: number | null;

  constructor(
    id: number,
    postId: number,
    imageUrl: string,
    orderIndex: number | null
  ) {
    this.id = id;
    this.postId = postId;
    this.imageUrl = imageUrl;
    this.orderIndex = orderIndex;
  }
}
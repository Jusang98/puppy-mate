import { LatLng } from '@/types/Map';

type CoursePost = {
  id: string;
  title: string;
  totalDistance: number;
  duration?: number;
  username: string;
  createdAt: string;
  likes: number;
  coordinates: LatLng[];
};

export type { CoursePost };

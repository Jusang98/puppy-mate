import { LatLng } from '@/types/Map';

type CoursePost = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  duration: number;
  distance: number;
  address: string;
  coordinates: LatLng[];
};

export type { CoursePost };

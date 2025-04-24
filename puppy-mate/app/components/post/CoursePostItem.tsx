'use client';

import { Heart, MapPin, Calendar } from 'lucide-react';
import SnapShotMap from '../map/SnapShotMap';
import { LatLng } from 'leaflet';
interface CoursePostItemProps {
  id: number;
  likes: number;
  title: string;
  createdAt: string;
  totalDistance: number;
  duration: number;
  username: string;
  address: string;
  coordinates: LatLng[];
}

const CoursePostItem = ({
  id,
  likes,
  title,
  createdAt,
  totalDistance,
  duration,
  username,
  address,
  coordinates,
}: CoursePostItemProps) => {
  // Format totalDistance to display only up to 2 decimal places
  const formattedDistance = totalDistance.toFixed(1);
  const formattedDate = new Date(createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex items-center gap-1 text-sm">
          <Heart size={16} className="text-gray-500" />
          <span>{likes}</span>
        </div>
      </div>
      <div className="flex gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>{formattedDistance}km</span>
        </div>
        {duration && <span>· {duration}분</span>}
      </div>

      <SnapShotMap coordinates={coordinates} size={100} />

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium">{username}</span>
          <div className="flex items-center text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
        <button onClick={() => {}} className="px-3 py-1.5 bg-black text-white text-sm rounded-md">
          경로 보기
        </button>
      </div>
    </div>
  );
};

export default CoursePostItem;

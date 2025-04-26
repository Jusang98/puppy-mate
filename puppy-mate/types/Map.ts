type Location = { lat: number; lng: number; heading?: number | null };
type LatLng = { lat: number; lng: number };
type CourseMarker = kakao.maps.Marker & { courseId?: number };

export type { Location, LatLng, CourseMarker };

type Location = { lat: number; lng: number };
type CourseMarker = kakao.maps.Marker & { courseId?: number };

export type { Location, CourseMarker };

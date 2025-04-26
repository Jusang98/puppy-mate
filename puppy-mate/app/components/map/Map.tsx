'use client';
import { Map as KakaoMap, MapMarker, MarkerClusterer, Polyline, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useRef, useEffect } from 'react';
import useMapStore from '@/store/useRecordingMapStore';
import { getDistance } from '@/utils/map/getDistance';
import { CourseListIsPublicDto } from '@/application/usecases/course/dto/CourseListIsPublicDto';
import { Location, CourseMarker } from '@/types/Map';
import { CurrentLocationIcon } from '@/app/components/map/GPSIcon';
import useCoursesMapStore from '@/store/useCoursesMapStore';
import { getCenterAndLevel } from '@/utils/map/getCenterAndLevel';

export function Map({
  currentLocation,
  courses,
  onClusterclick,
  onMarkerClick,
  mapCenterPosition,
}: {
  currentLocation: Location | null;
  courses: CourseListIsPublicDto[] | undefined;
  onClusterclick: (target: kakao.maps.MarkerClusterer, cluster: kakao.maps.Cluster) => void;
  onMarkerClick: (courseId: number) => void;
  mapCenterPosition: Location;
}) {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const { coordinates, addCoursePoint, isSavingCourse } = useMapStore();

  // mapCenterPosition 바뀔때 마다 맵 중심 위치 설정
  useEffect(() => {
    if (!mapRef.current) return;

    if (mapCenterPosition) {
      mapRef.current.setCenter(new kakao.maps.LatLng(mapCenterPosition.lat, mapCenterPosition.lng));
    }
  }, [mapCenterPosition]);

  // 저장중에 현재 위치 바뀔때 마다 경로 추가, 맵 중심 위치 설정
  useEffect(() => {
    if (isSavingCourse && currentLocation) {
      const lastPosition = coordinates.at(-1);
      if (!lastPosition || getDistance(lastPosition, currentLocation) > 1) {
        addCoursePoint(currentLocation); // 경로 저장
      }

      if (mapRef.current) {
        mapRef.current.setCenter(new kakao.maps.LatLng(currentLocation.lat, currentLocation.lng));
      }
    }
  }, [currentLocation, isSavingCourse]);

  // 경로 상세 보기 좌표들 생겼을때 맵 중심 위치 설정
  const { courseCoordinates } = useCoursesMapStore();
  useEffect(() => {
    if (courseCoordinates.length === 0) return;
    const { center, level } = getCenterAndLevel(courseCoordinates);
    if (mapRef.current) {
      mapRef.current.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
      mapRef.current.setLevel(level);
    }
  }, [courseCoordinates]);

  return (
    <div className="absolute inset-0 z-0">
      <KakaoMap
        id="map"
        className="w-full h-full"
        ref={mapRef}
        center={mapCenterPosition}
        level={3} // 지도의 확대 레벨
      >
        {currentLocation && (
          <>
            <CustomOverlayMap position={currentLocation}>
              <CurrentLocationIcon heading={currentLocation.heading || null} />
              {/* 현재 위치에 마커 표시 */}
            </CustomOverlayMap>
            {/* 이동 경로를 따라 폴리라인 그리기 */}
            {isSavingCourse && (
              <Polyline
                path={coordinates} // 폴리라인 경로
                strokeWeight={5} // 선 두께
                strokeColor="#FF0000" // 선 색상
                strokeOpacity={0.8} // 선 투명도
                strokeStyle="solid" // 선 스타일
              />
            )}
            {courseCoordinates.length > 0 && (
              <Polyline
                path={courseCoordinates} // 폴리라인 경로
                strokeWeight={5} // 선 두께
                strokeColor="#4F46E5" // 선 색상 (인디고 색상으로 변경)
                strokeOpacity={0.8} // 선 투명도
              />
            )}
          </>
        )}
        {courses && (
          <MarkerClusterer
            averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={5} // 클러스터 할 최소 지도 레벨
            disableClickZoom={true} // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
            // 마커 클러스터러에 클릭이벤트를 등록합니다
            // 마커 클러스터러를 생성할 때 disableClickZoom을 true로 설정하지 않은 경우
            // 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있습니다
            onClusterclick={onClusterclick}>
            {courses.map((pos) => (
              <MapMarker
                key={pos.id}
                position={{
                  lat: pos.startPoint.lat,
                  lng: pos.startPoint.lng,
                }}
                onClick={() => onMarkerClick(pos.id)}
                onCreate={(marker) => {
                  (marker as CourseMarker).courseId = pos.id; // ✅ 각 marker 객체에 id 직접 부여
                }}
              />
            ))}
          </MarkerClusterer>
        )}
      </KakaoMap>
    </div>
  );
}

'use client';
import { Map as KakaoMap, MapMarker, MarkerClusterer, Polyline } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../../lib/use-kakao-loader';
import { useCurrentLocation } from '../../../hooks/useCurrentLocation';
import { useRef, useEffect, useState } from 'react';
import useMapStore from '@/store/useMapStore';
import { getDistance } from '../../../utils/getDistance';
import SaveCourseModal from '@/app/components/SaveCourseModal';
import { createCourse } from '../../../api/course';
import { getAddress } from '../../../utils/getCoordinateAddress';
import { useCourseQuery } from '@/queries/Course';

export function Map() {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const { location, error } = useCurrentLocation();
  const {
    coordinates,
    addCoursePoint,
    startRecordingCourse,
    isSavingCourse,
    startTime,
  } = useMapStore();
  const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState(false);
  const { coursesQuery } = useCourseQuery();
  const { isLoading, data: courses } = coursesQuery;

  // 테스트를 위한 더미 데이터
  const dummyPath = [
    { lat: 37.56421035025637, lng: 127.00767976641002 },
    { lat: 37.56431035025637, lng: 127.00777976641002 },
    { lat: 37.56441035025637, lng: 127.00787976641002 },
    { lat: 37.56451035025637, lng: 127.00797976641002 },
    { lat: 37.56461035025637, lng: 127.00807976641002 },
    { lat: 37.56471035025637, lng: 127.00817976641002 },
    { lat: 37.56481035025637, lng: 127.00827976641002 },
    { lat: 37.56491035025637, lng: 127.00837976641002 },
    { lat: 37.56501035025637, lng: 127.00847976641002 },
    { lat: 37.56511035025637, lng: 127.00857976641002 },
  ];
  // dummyPath.forEach((point) => {
  //   addCoursePoint(point);
  // });

  useEffect(() => {
    coordinates.push(...dummyPath);
  }, []);

  useKakaoLoader();

  // 현재 위치 바뀔때 마다 지도 중심 이동
  useEffect(() => {
    if (!mapRef.current) return;

    if (location) {
      const center = new kakao.maps.LatLng(location.lat, location.lng);
      mapRef.current.setCenter(center);
    }
  }, [location]);

  // 현재 위치 바뀔때 마다 경로 추가
  useEffect(() => {
    if (isSavingCourse && location) {
      const lastPosition = coordinates.at(-1);
      if (!lastPosition || getDistance(lastPosition, location) > 1) {
        addCoursePoint(location); // 경로 저장
      }
    }
  }, [location, isSavingCourse]);

  if (error) {
    return <div>위치 정보를 가져올 수 없습니다: {error}</div>;
  }
  const onModalOpenChange = (open: boolean) => {
    setIsCreateCourseModalOpen(open);
  };

  const handleToggleBtnClick = async () => {
    if (isSavingCourse) {
      setIsCreateCourseModalOpen(true);
    } else {
      startRecordingCourse(); // 시작
    }
  };

  const handleSaveCourse = async (name: string) => {
    const duration = new Date().getTime() - startTime;
    let totalDistance = 0;
    let address = '';
    // 도로 좌표 {lat: 37.56423690189401, lng: 127.00764941529607}
    coordinates.forEach((coord, index) => {
      if (index > 0) {
        totalDistance += getDistance(coordinates[index - 1], coord);
      }
    });

    try {
      address = await getAddress(coordinates[0].lng, coordinates[0].lat);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
    try {
      // createCourse 호출
      const courseId = await createCourse(
        name,
        address,
        totalDistance,
        duration,
        coordinates
      );
      console.log(`Course saved successfully with ID: ${courseId}`);
    } catch (error) {
      console.error('Failed to save course:', error);
    }
  };
  // const onClusterclick = (target, cluster) => {
  //   console.log(cluster);
  //      const markers = cluster.getMarkers();
  //   console.log("클러스터 안의 마커 ID 목록:");
  //   markers.forEach((marker) => {
  //     console.log(marker.courseId); // ✅ 여기서 id 출력
  //   });
  return (
    <>
      <button onClick={handleToggleBtnClick}>
        토글 버튼{isSavingCourse ? 'on' : 'off'}
      </button>
      <KakaoMap
        id='map'
        ref={mapRef}
        center={{ lat: 37.566535, lng: 126.977125 }}
        style={{
          width: '100%',
          height: '350px',
        }}
        level={3} // 지도의 확대 레벨
      >
        {location && (
          <>
            {/* 현재 위치에 마커 표시 */}
            <MapMarker position={location} />

            {/* 이동 경로를 따라 폴리라인 그리기 */}
            {isSavingCourse && (
              <Polyline
                path={coordinates} // 폴리라인 경로
                strokeWeight={5} // 선 두께
                strokeColor='#FF0000' // 선 색상
                strokeOpacity={0.8} // 선 투명도
                strokeStyle='solid' // 선 스타일
              />
            )}
          </>
        )}
        {courses && (
          <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={10} // 클러스터 할 최소 지도 레벨
          disableClickZoom={true} // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
          // 마커 클러스터러에 클릭이벤트를 등록합니다
          // 마커 클러스터러를 생성할 때 disableClickZoom을 true로 설정하지 않은 경우
          // 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있습니다
          onClusterclick={onClusterclick}
        >
          {courses.map((pos, i) => (
            <MapMarker
              key={`${pos.startPoint.lat}-${pos.startPoint.lng}`}
              position={{
                lat: pos.startPoint.lat,
                lng: pos.startPoint.lng,
              }}
              onCreate={(marker) => {
                (marker as kakao.maps.Marker & { courseId?: number }).courseId = pos.id; // ✅ 각 marker 객체에 id 직접 부여
              }}
            />
          ))}
        </MarkerClusterer>
        )}
      </KakaoMap>
      {/* Modal 컴포넌트 */}
      <SaveCourseModal
        open={isCreateCourseModalOpen}
        onSave={handleSaveCourse}
        onOpenChange={onModalOpenChange}
      />
    </>
  );
}
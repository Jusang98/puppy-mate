'use client';
import { useState } from 'react';

import useKakaoLoader from '@/lib/use-kakao-loader';
import { Map } from '@/app/(map)/components/Map';
import { useCourseQuery } from '@/queries/Course';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { useCourseSave } from '@/hooks/useCourseSave';
import SaveCourseModal from '@/app/components/SaveCourseModal';
import useMapStore from '@/store/useMapStore';
import { CourseMarker } from '@/types/Map';

export default function MapPage() {
  const { coursesQuery } = useCourseQuery();
  const { location, error } = useCurrentLocation();

  const { isLoading, data: courses } = coursesQuery;
  useKakaoLoader();

  // 토긃버튼 클릭 상태 관리
  const { isSavingCourse, startRecordingCourse } = useMapStore();
  const handleToggleBtnClick = async () => {
    if (isSavingCourse) {
      setIsCreateCourseModalOpen(true);
    } else {
      startRecordingCourse(); // 시작
    }
  };

  // 코스 저장 모달 상태 관리
  const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState(false);
  const onModalOpenChange = (open: boolean) => {
    setIsCreateCourseModalOpen(open);
  };

  // 클러스터 클릭 이벤트 핸들러
  const onClusterclick = (target: kakao.maps.MarkerClusterer, cluster: kakao.maps.Cluster) => {
    console.log(cluster);
    const markers = cluster.getMarkers();
    console.log('클러스터 안의 마커 ID 목록:');
    markers.forEach((marker) => {
      console.log((marker as CourseMarker).courseId); // ✅ 여기서 id 출력
    });
  };

  return (
    <div className="relative w-screen h-screen">
      {/* 나중에 토스트로 변경 */}
      {error && <div> 에러 발생 {error}</div>}
      {/* 만약 기존 코스들을 가져오지 못한다면 어떻게 할까 */}
      {isLoading ? (
        <div> 로딩중</div>
      ) : (
        <Map currentLocation={location} courses={courses} onClusterclick={onClusterclick} />
      )}
      {/* Modal 컴포넌트 */}
      <SaveCourseModal open={isCreateCourseModalOpen} onSave={useCourseSave} onOpenChange={onModalOpenChange} />
    </div>
  );
}

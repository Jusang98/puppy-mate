import { create } from 'zustand';
import { devtools, combine } from 'zustand/middleware';
import { LatLng } from '@/types/Map';

// 맵에서 클러스터 혹은 마커 클릭시 : 클릭된 마커의 코스들을 저장하는 스토어
// 경로 상세보기 누르면 경로의 좌표들도 저장한다. 해당 경로는 기록하는 경로(useRecordingMapStore)와 다르다.
const useCoursesMapStore = create(
  devtools(
    combine(
      {
        courseIds: [] as number[],
        courseCoordinates: [] as LatLng[],
      },
      (set, get) => {
        const addCourseId = (courseId: number) => set((state) => ({ courseIds: [...state.courseIds, courseId] }));
        const appendCourseIds = (courseIds: number[]) =>
          set((state) => ({ courseIds: [...state.courseIds, ...courseIds] }));
        const clearCourseIds = () => set({ courseIds: [] });
        const setCourseCoordinates = (coordinates: LatLng[]) => set({ courseCoordinates: coordinates });
        const clearCourseCoordinates = () => set({ courseCoordinates: [] });

        return {
          addCourseId,
          appendCourseIds,
          clearCourseIds,
          setCourseCoordinates,
          clearCourseCoordinates,
        };
      }
    )
  )
);

export default useCoursesMapStore;

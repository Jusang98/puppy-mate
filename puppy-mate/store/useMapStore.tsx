import { createCourse } from '@/app/(map)/lib/api/course';
import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

export interface LatLng {
  lat: number;
  lng: number;
}

const useMapStore = create(
  devtools(
    combine(
      {
        path: [] as LatLng[], // 초기 경로는 빈 배열
        isSavingPath: false
      },
      (set, get) => {
        const addPathPoint = (point: LatLng) =>
          set(state => ({ path: [...state.path, point] })); // 새로운 좌표 추가
        const clearPath = () => set({ path: [] }); // 경로 초기화
        const toggleSavingPath = async (
          name,
          courseImageUrl,
          address,
          distance,
          duration,
          coordinates
        ) => {
          const { isSavingPath, path } = get();
          if (!isSavingPath) {
            try {
              await createCourse(path); // createCourse 호출
              console.log('Path saved successfully');
              clearPath(); // path 초기화
            } catch (error) {
              console.error('Failed to save path:', error);
            }
          }
          set(state => ({ isSavingPath: !state.isSavingPath })); // 상태 토글
        };

        return {
          addPathPoint,
          clearPath,
          toggleSavingPath
        };
      }
    )
  )
);

export default useMapStore;

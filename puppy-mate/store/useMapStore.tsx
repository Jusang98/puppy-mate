import { createCourse } from '@/app/(map)/lib/api/course';
import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

export interface LatLng {
  lat: number;
  lng: number;
}
interface ToggleSavingPathParams {
  name: string;
  courseImageUrl: string;
  address: string;
  distance: number;
  duration: number;
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
        const startRecordingPath = () => set({ isSavingPath: true });
        const stopAndSavePath = async ({
          name,
          courseImageUrl,
          address,
          distance,
          duration
        }: ToggleSavingPathParams) => {
          const { path } = get();
          try {
            await createCourse(
              name,
              courseImageUrl,
              address,
              distance,
              duration,
              path
            );
            console.log('Path saved');
            set({ isSavingPath: false });
            clearPath();
          } catch (err) {
            console.error('저장 실패:', err);
          }
        };

        return {
          addPathPoint,
          clearPath,
          startRecordingPath,
          stopAndSavePath
        };
      }
    )
  )
);

export default useMapStore;

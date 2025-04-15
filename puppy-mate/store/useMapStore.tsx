import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export interface LatLng {
  lat: number;
  lng: number;
}

const useMapStore = create(
  combine(
    {
      path: [] as LatLng[], // 초기 경로는 빈 배열
      isSavingPath: false
    },
    set => ({
      addPathPoint: (point: LatLng) =>
        set(state => ({ path: [...state.path, point] })), // 새로운 좌표 추가
      clearPath: () => set({ path: [] }), // 경로 초기화
      toggleSavingPath: () =>
        set(state => ({ isSavingPath: !state.isSavingPath }))
    })
  )
);

export default useMapStore;

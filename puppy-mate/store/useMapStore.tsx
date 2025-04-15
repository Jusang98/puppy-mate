import { create } from 'zustand';

interface LatLng {
    lat: number;
    lng: number;
}

interface MapStore {
    bears: number;
    path: LatLng[]; // 지도 경로 데이터를 저장할 상태
    increasePopulation: () => void;
    removeAllBears: () => void;
    updateBears: (newBears: number) => void;
    addPathPoint: (point: LatLng) => void; // 경로에 새로운 좌표 추가
    clearPath: () => void; // 경로 초기화
}

const useMapStore = create<MapStore>((set) => ({
    bears: 0,
    path: [], // 초기 경로는 빈 배열
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears) => set({ bears: newBears }),
    addPathPoint: (point) =>
        set((state) => ({ path: [...state.path, point] })), // 새로운 좌표 추가
    clearPath: () => set({ path: [] }), // 경로 초기화
}));

export default useMapStore;
import { create } from 'zustand';
import { devtools, combine } from 'zustand/middleware';
import { LatLng } from '@/types/Map';

const useCourseMapStore = create(
  devtools(
    combine({
      coordinates: [] as LatLng[],
      isSavingCourse: false,
      startTime: 0,
    },
    (set, get) => {
      const addCoursePoint = (point: LatLng) => set((state) => ({ coordinates: [...state.coordinates, point] }));
      const clearCourse = () => set({ coordinates: [] });
      const startRecordingCourse = () => set({ isSavingCourse: true, startTime: new Date().getTime() });
      const stopRecordingCourse = () => set({ isSavingCourse: false });

      return {
        addCoursePoint,
        clearCourse,
        startRecordingCourse,
        stopRecordingCourse,
      };
    }
  )
);

export default useCourseMapStore;

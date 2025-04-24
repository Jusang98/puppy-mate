import { create } from 'zustand';
import { devtools, combine } from 'zustand/middleware';

const useCoursesMapStore = create(
  devtools(
    combine(
      {
        courseIds: [] as number[],
      },
      (set, get) => {
        const addCourseId = (courseId: number) => set((state) => ({ courseIds: [...state.courseIds, courseId] }));
        const appendCourseIds = (courseIds: number[]) =>
          set((state) => ({ courseIds: [...state.courseIds, ...courseIds] }));
        const clearCourseIds = () => set({ courseIds: [] });

        return {
          addCourseId,
          appendCourseIds,
          clearCourseIds,
        };
      }
    )
  )
);

export default useCoursesMapStore;

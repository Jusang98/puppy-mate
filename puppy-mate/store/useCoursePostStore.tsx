import { create } from 'zustand';
import { devtools, combine } from 'zustand/middleware';
import { CoursePost } from '@/types/Post';

const useCoursePostStore = create(
  devtools(
    combine(
      {
        posts: null as CoursePost[] | null,
      },
      (set, get) => {
        const setCoursePosts = (posts: CoursePost[]) => set({ posts });
        const clearCoursePosts = () => set({ posts: null });
        return {
          setCoursePosts,
          clearCoursePosts,
        };
      }
    )
  )
);

export default useCoursePostStore;

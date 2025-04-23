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
        const appendCoursePosts = (posts: CoursePost[] | null) => {
          if (posts && posts.length > 0 && get().posts !== null) {
            set((state) => ({ posts: [...(state.posts || []), ...posts] }));
          }
        };
        const clearCoursePosts = () => set({ posts: null });
        return {
          appendCoursePosts,
          clearCoursePosts,
        };
      }
    )
  )
);

export default useCoursePostStore;

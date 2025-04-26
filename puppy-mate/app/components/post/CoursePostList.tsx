'use client';

import CoursePostItem, { CoursePostItemSkeleton } from './CoursePostItem';
import { CoursePost } from '@/types/Post';

const CoursePostList = ({
  posts,
  isLoading,
  isError,
  errors,
}: {
  posts: CoursePost[];
  isLoading: boolean;
  isError: boolean;
  errors: (Error | null)[];
}) => {
  return (
    <div className="space-y-4 overflow-y-auto px-4">
      {isLoading ? (
        // Show skeleton loading UI when data is loading
        <>
          <CoursePostItemSkeleton />
          <CoursePostItemSkeleton />
          <CoursePostItemSkeleton />
        </>
      ) : !posts || posts.length === 0 ? ( // empty list 는 truty 이기때문에 post.length === 0 조건 추가.
        <div className="text-center py-8 text-gray-500 ">선택된 코스가 없습니다.</div>
      ) : (
        posts.map((post) => {
          return (
            <CoursePostItem
              id={post.id}
              likes={0}
              username={'jwanpark'}
              key={post.id}
              title={post.title}
              createdAt={post.createdAt}
              totalDistance={post.distance}
              duration={post.duration}
              address={post.address}
              coordinates={post.coordinates}
            />
          );
        })
      )}
    </div>
  );
};

export default CoursePostList;

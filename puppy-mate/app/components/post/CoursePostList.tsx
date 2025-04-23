'use client';

import CoursePostItem from './CoursePostItem';
import useCoursePostStore from '@/store/useCoursePostStore';

const CoursePostList = () => {
  const { posts } = useCoursePostStore();
  return (
    <div className="space-y-4">
      {!posts || posts.length === 0 ? ( // empty list 는 truty 이기때문에 post.length === 0 조건 추가.
        <div className="text-center py-8 text-gray-500">선택된 코스가 없습니다.</div>
      ) : (
        posts.map((post) => (
          <CoursePostItem
            key={post.id}
            id={post.id}
            title={post.title}
            totalDistance={post.totalDistance}
            duration={post.duration}
            username={post.username}
            createdAt={post.createdAt}
            likes={post.likes}
          />
        ))
      )}
    </div>
  );
};

export default CoursePostList;

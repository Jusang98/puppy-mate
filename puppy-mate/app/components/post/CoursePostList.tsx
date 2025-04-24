'use client';

import CoursePostItem from './CoursePostItem';
import { CoursePost } from '@/types/Post';

const CoursePostList = ({ posts }: { posts: CoursePost[] }) => {
  return (
    <div className='space-y-4 overflow-y-auto'>
      {!posts || posts.length === 0 ? ( // empty list 는 truty 이기때문에 post.length === 0 조건 추가.
        <div className='text-center py-8 text-gray-500'>
          선택된 산책로가 없습니다.
        </div>
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

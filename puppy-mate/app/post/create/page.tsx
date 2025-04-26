'use client';

import { Suspense } from 'react';
import PostCreateForm from '@/app/components/post/PostCreateForm';

export default function CreatePostPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PostCreateForm />
    </Suspense>
  );
}

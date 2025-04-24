'use client';

import { useEffect, useState } from 'react';
import { getLikedPostsWithSnapshot } from '@/api/mypage';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import SnapShotMap from '@/app/components/map/SnapShotMap';
import useKakaoLoader from '@/lib/use-kakao-loader';
import { useRouter } from 'next/navigation';

// DTO 타입 예시 (실제 타입에 맞게 import 또는 수정)
export interface GetLikedPostWithSnapshotDto {
  postId: number;
  title: string;
  content: string;
  courseId: number;
  coordinates: { lat: number; lng: number }[];
  createdAt: string;
}

export default function LikedPostsPage() {
  const router = useRouter();
  const [likedPosts, setLikedPosts] = useState<GetLikedPostWithSnapshotDto[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  useKakaoLoader();

  useEffect(() => {
    async function fetchLikedPosts() {
      try {
        const data = await getLikedPostsWithSnapshot();
        setLikedPosts(data);
      } catch (error) {
        // 에러 처리 (필요시)
      } finally {
        setLoading(false);
      }
    }
    fetchLikedPosts();
  }, []);

  const handleBackMyPage = () => {
    router.push('/mypage');
  };

  if (loading) {
    // 로딩 시 Skeleton 카드 3개 표시
    return (
      <div className='space-y-4 p-4'>
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className='h-6 w-32 mb-2' />
              <Skeleton className='h-4 w-48' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-4 w-24 mb-1' />
              <Skeleton className='h-4 w-24 mb-1' />
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-40 w-full mt-2' /> {/* 지도 스켈레톤 */}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className='space-y-4 p-4'>
      <button
        onClick={handleBackMyPage}
        className='px-4 py-2 rounded bg-orange-600 text-white font-semibold shadow hover:bg-orange-700 transition'
      >
        {'←'}
      </button>
      {likedPosts.length === 0 ? (
        <div className='text-center text-gray-500'>찜한 게시글이 없습니다.</div>
      ) : (
        likedPosts.map((post, idx) => (
          <Card key={post.postId}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                {post.content.length > 50
                  ? post.content.slice(0, 50) + '...'
                  : post.content}
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-1'>
              <div className='flex flex-row items-stretch gap-4'>
                {/* 왼쪽: 텍스트 정보 */}
                <div className='flex-1 flex flex-col justify-between py-2'>
                  <div>
                    <div className='text-sm text-gray-600'>
                      코스 ID: {post.courseId}
                    </div>
                    <div className='text-xs text-gray-400 mt-2'>
                      게시일:{' '}
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString()
                        : '-'}
                    </div>
                  </div>
                </div>
                {/* 오른쪽: 지도 */}
                {post.coordinates && post.coordinates.length > 0 && (
                  <div
                    className='flex-shrink-0 flex items-center'
                    style={{ height: 200 }}
                  >
                    <SnapShotMap coordinates={post.coordinates} size={200} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

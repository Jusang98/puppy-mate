'use client';

import { useEffect, useState } from 'react';
import { getLikedPostsWithSnapshot } from '@/api/mypage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GetLikedPostWithSnapshotDto } from '@/application/usecases/postlike/dto/GetLikedPostWithSnapshotDto';
import { Skeleton } from '@/components/ui/skeleton';
import SnapShotMap from '@/app/components/map/SnapShotMap';
import useKakaoLoader from '@/lib/use-kakao-loader';
import { useRouter } from 'next/navigation';
GetLikedPostWithSnapshotDto;
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
        console.error(error);
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
    return (
      <div className='space-y-4 p-4'>
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className='h-6 w-32 mb-2' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-4 w-24 mb-1' />
              <Skeleton className='h-4 w-24 mb-1' />
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-40 w-full mt-2' />
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
        likedPosts.map((post) => (
          <Card key={post.postId}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='flex flex-row gap-4 items-start'>
                {/* 왼쪽: 텍스트 정보 */}
                <div className='flex-1 space-y-1 text-sm text-gray-700'>
                  <div>거리: {Math.round(post.distance * 10) / 10} km</div>
                  <div>소요 시간: {post.duration} 분</div>
                  <div className='text-xs text-gray-400'>
                    생성일: {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* 오른쪽: 지도 */}
                {post.coordinates?.length > 0 && (
                  <div className='flex-shrink-0' style={{ height: 200 }}>
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

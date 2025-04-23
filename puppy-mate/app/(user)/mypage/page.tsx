'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getUserProfile } from '@/api/user'; // 작성한 getUserProfile API
import { useRouter } from 'next/navigation';

type UserProfile = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
};

export default function MyPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className='p-6 space-y-4'>
        <Skeleton className='w-24 h-24 rounded-full' />
        <Skeleton className='w-32 h-6' />
        <div className='space-y-2'>
          <Skeleton className='h-20' />
          <Skeleton className='h-20' />
          <Skeleton className='h-20' />
        </div>
      </div>
    );
  }

  return (
    <div className='p-6 space-y-6'>
      {/* 프로필 섹션 */}
      <div className='flex items-center gap-4'>
        <div className='relative w-24 h-24'>
          <Image
            src={
              profile?.profileImageUrl
                ? `${process.env.SUPABASE_URL}/storage/v1/object/public/images/profile/${profile.profileImageUrl}`
                : '/default-profile.png'
            }
            alt='Profile'
            fill
            className='rounded-full object-cover'
          />
        </div>
        <div className='text-xl font-semibold'>{profile?.nickname}</div>
      </div>

      {/* 관리 카드들 */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Card
          onClick={() => router.push('/my/walks')}
          className='cursor-pointer hover:shadow-md transition'
        >
          <CardContent className='p-6 text-center text-lg font-medium'>
            내 산책로 관리
          </CardContent>
        </Card>
        <Card
          onClick={() => router.push('/my/favorites')}
          className='cursor-pointer hover:shadow-md transition'
        >
          <CardContent className='p-6 text-center text-lg font-medium'>
            찜 산책로 관리
          </CardContent>
        </Card>
        <Card
          onClick={() => router.push('/my/posts')}
          className='cursor-pointer hover:shadow-md transition'
        >
          <CardContent className='p-6 text-center text-lg font-medium'>
            내 포스트 관리
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getUserProfile, logoutUser } from '@/api/user';
import { Skeleton } from '@/components/ui/skeleton';
import { GetUserDto } from '@/application/usecases/user/dto/GetUserDto';
import { FaRoute, FaHeart, FaClipboardList } from 'react-icons/fa';

export default function MyPage() {
  const [profile, setProfile] = useState<GetUserDto | null>(null);
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

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

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
      {/* 상단: 프로필 영역 */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <div className='relative w-20 h-20'>
            <Image
              src={profile?.profileImage || '/default-profile.png'}
              alt='Profile'
              fill
              className='rounded-full object-cover'
            />
          </div>
          <div>
            <div className='text-lg font-semibold'>{profile?.nickname}</div>
            <div className='mt-1 flex  gap-2 text-xs text-gray-600 items-center'>
              <button
                onClick={() => router.push('/mypage/courses')}
                className='flex items-center gap-1 hover:underline'
              >
                <FaRoute size={12} />내 산책로
              </button>
              <span>|</span>
              <button
                onClick={() => router.push('/mypage/likeposts')}
                className='flex items-center gap-1 hover:underline'
              >
                <FaHeart size={12} />
                찜한 산책로
              </button>
              <span>|</span>
              <button
                onClick={() => router.push('/mypage/posts')}
                className='flex items-center gap-1 hover:underline'
              >
                <FaClipboardList size={12} />내 게시물
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className='relative -top-5 text-xs px-0.5 py-0.5 bg-gray-200 rounded-sm hover:bg-red-500 hover:text-white transition'
        >
          logout
        </button>
      </div>

      {/* 광고 배너 영역 */}
      {[1, 2, 3, 4].map((_, i) => (
        <div key={i} className='rounded-xl border shadow overflow-hidden'>
          <div className='w-full h-36 flex items-center justify-center bg-gray-50 text-gray-500'>
            📢 이달의 산책로 or 광고 배너 {i + 1}
          </div>
        </div>
      ))}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getUserProfile, logoutUser } from '@/api/user';
import { Skeleton } from '@/components/ui/skeleton';
import { GetUserDto } from '@/application/usecases/user/dto/GetUserDto';
import { IoChevronForward } from 'react-icons/io5';
import { FaDog, FaRoute, FaClipboardList } from 'react-icons/fa';
import { HiHeart } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import Mypageheader from './components/Mypageheader';

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

  const handleLogoutBtnClick = () => {
    logoutUser();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className='p-4 space-y-4'>
        <Skeleton className='w-full h-12' />
        <div className='mt-2 flex items-center'>
          <Skeleton className='w-16 h-16 rounded-full inline-block' />
          <div className='ml-4 flex flex-col justify-center'>
            <Skeleton className='w-32 h-5 mb-2' />
            <Skeleton className='w-32 h-5' />
          </div>
        </div>
        <div className='space-y-3 mt-6'>
          <Skeleton className='h-12' />
          <Skeleton className='h-12' />
          <Skeleton className='h-12' />
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full bg-gray-50'>
      <Mypageheader title='마이페이지' />
      {/* 프로필 섹션 */}
      <div className='bg-white px-5 py-4 flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <div className='relative w-[50px] h-[50px] shadow-md border-3 border-orange-400 rounded-full'>
            {profile?.profileImage ? (
              <Image
                src={profile.profileImage}
                alt='Profile'
                fill
                className='rounded-full object-cover'
              />
            ) : (
              <div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center'>
                <FaDog className='text-gray-400' size={24} />
              </div>
            )}
          </div>
          <div>
            <h2 className='font-semibold inline-block'>
              {profile?.nickname || '김멍멍'}
            </h2>
            <span>님</span>
            <p className='text-xs text-gray-500'>기본 정보 보기</p>
          </div>
        </div>
        <Button onClick={handleLogoutBtnClick} variant='outline'>
          로그아웃
        </Button>
      </div>

      {/* 메뉴 섹션 - 산책로 관리 */}
      <div className='mt-2 bg-white'>
        <h3 className='px-5 pb-4 pt-4 text-sm font-medium text-gray-600'>
          산책로 관리
        </h3>
        <div>
          {/* 내 산책로 관리 */}
          <div
            className='flex items-center justify-between px-5 py-4 border-b'
            onClick={() => router.push('/mypage/courses')}
          >
            <div className='flex items-center'>
              <div className='flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-md mr-3'>
                <span className='text-yellow-500 text-lg'>
                  <FaRoute />
                </span>
              </div>
              <span>내 산책로 관리</span>
            </div>
            <div className='flex items-center'>
              <IoChevronForward size={20} className='text-gray-400' />
            </div>
          </div>

          {/* 찜 산책로 관리 */}
          <div
            className='flex items-center justify-between px-5 py-4 border-b'
            onClick={() => router.push('/mypage/likeposts')}
          >
            <div className='flex items-center'>
              <div className='flex items-center justify-center w-8 h-8 bg-pink-100 rounded-md mr-3'>
                <span className='text-lg'>
                  <HiHeart className='text-red-500' />
                </span>
              </div>
              <span>내가 찜한 산책로</span>
            </div>
            <IoChevronForward size={20} className='text-gray-400' />
          </div>

          {/* 내 게시물 */}
          <div
            className='flex items-center justify-between px-5 py-4'
            onClick={() => router.push('/mypage/posts')}
          >
            <div className='flex items-center'>
              <div className='flex items-center justify-center w-8 h-8 bg-green-100 rounded-md mr-3'>
                <FaClipboardList className='text-l text-green-700' />
              </div>
              <span>내 게시물 관리</span>
            </div>
            <IoChevronForward size={20} className='text-gray-400' />
          </div>
        </div>
      </div>

      {/* 서비스 섹션 */}
      {/* <div className='mt-4'>
        <h3 className='px-5 py-2 text-sm font-medium text-gray-600'>서비스</h3>
        <div className='bg-white'>
          <div className='flex items-center justify-between px-5 py-4'>
            <div className='flex items-center'>
              <div className='flex items-center justify-center w-8 h-8 bg-gray-100 rounded-md mr-3'>
                <span className='text-lg'>📍</span>
              </div>
              <span>GPS</span>
            </div>
            <Switch />
          </div>
        </div>
      </div> */}
    </div>
  );
}

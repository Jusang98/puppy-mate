'use client';

import { useEffect, useState } from 'react';
import { getMyCourses } from '@/api/mypage';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { GetMyCoursesDto } from '@/application/usecases/course/dto/GetMyCoursesDto';
import SnapShotMap from '@/app/components/map/SnapShotMap';
import useKakaoLoader from '@/lib/use-kakao-loader';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/utils/common';
import { Button } from '@/components/ui/button';
import useCoursesMapStore from '@/store/useCoursesMapStore';
import { LatLng } from '@/types/Map';
import { IoLocationOutline } from 'react-icons/io5';
import { LuTimer } from 'react-icons/lu';
import { CiCalendar } from 'react-icons/ci';
import { FaShoePrints, FaRoute, FaMapMarkerAlt, FaPen } from 'react-icons/fa';
import Mypageheader from '../components/Mypageheader';

export default function MyCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<GetMyCoursesDto[]>([]);
  const [loading, setLoading] = useState(true);
  useKakaoLoader();
  const { setCourseCoordinates, clearCourseCoordinates } = useCoursesMapStore();
  const handleFollowBtnClick = (coordinates: LatLng[]) => {
    router.push('/');
    clearCourseCoordinates();
    setCourseCoordinates(coordinates);
  };
  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getMyCourses();
        const sortedData = data.sort(
          (a: GetMyCoursesDto, b: GetMyCoursesDto) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setCourses(sortedData);
      } catch (error) {
        // 에러 처리 (필요시)
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  if (loading) {
    // 로딩 시 Skeleton 카드 3개 표시
    return (
      <div className='space-y-4 p-4'>
        <Skeleton className='h-4 w-24 mb-1' />
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
    <>
      <Mypageheader title='내 산책로' />
      <div className='space-y-4 p-4'>
        {courses.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-24 text-gray-500'>
            <FaRoute size={52} className='text-orange-300 mb-4' />
            <p className='text-center text-lg font-medium'>
              아직 등록된 산책로가 없습니다
            </p>
            <p className='text-sm mt-1'>직접 산책로를 등록해보세요</p>
            <Button
              onClick={() => router.push('/')}
              className='mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl'
            >
              산책로 만들기
            </Button>
          </div>
        ) : (
          courses.map((course, idx) => (
            <Card
              key={idx}
              className='overflow-hidden rounded-2xl py-0 shadow-sm border border-orange-200 transition-all hover:shadow-md bg-white'
            >
              <CardHeader className='bg-gradient-to-r py-4 from-orange-50 to-orange-100 pb-3'>
                <CardTitle className='text-lg font-semibold text-orange-700 flex items-center gap-2 justify-between'>
                  <span>{course.name}</span>
                  <span className='flex items-center gap-1 text-xs'>
                    <span
                      className={
                        course.isPublic
                          ? 'inline-block w-3 h-3 rounded-full bg-green-500'
                          : ''
                      }
                    />
                    <span
                      className={
                        course.isPublic ? 'text-green-600 font-semibold' : ''
                      }
                    >
                      {course.isPublic ? '공유 중' : ''}
                    </span>
                  </span>
                </CardTitle>
                <CardDescription className='text-sm text-gray-600 flex items-center gap-1'>
                  <IoLocationOutline size={16} />
                  {course.address}
                </CardDescription>
              </CardHeader>

              <CardContent className='p-4'>
                <div className='flex flex-col md:flex-row gap-4'>
                  <div className='flex-1 content-center space-y-2 text-sm text-gray-700'>
                    <div className='flex items-center gap-2'>
                      <FaShoePrints className='text-xl rotate-[-90deg] text-orange-400' />
                      <span>거리: {course.distance} km</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <LuTimer className='text-xl text-orange-400' />
                      <span>산책 시간: {course.duration} 분</span>
                    </div>

                    <div className='flex items-center gap-2 text-xs text-gray-500 mt-1'>
                      <CiCalendar className='text-xl text-orange-400' />
                      <span>{formatDate(course.createdAt)}</span>
                    </div>
                  </div>

                  {course.coordinates && (
                    <SnapShotMap coordinates={course.coordinates} size={150} />
                  )}
                </div>
              </CardContent>

              <CardFooter className='[.border-t]:pt-4 items-center flex flex-col gap-2 p-4 border-t border-orange-100'>
                <Button
                  onClick={() => handleFollowBtnClick(course.coordinates)}
                  variant='outline'
                  className='w-full border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700 flex items-center justify-center gap-2 rounded-xl'
                >
                  <FaMapMarkerAlt />
                  산책로 따라가기
                </Button>

                {/* 공개된 산책로가 아니면 게시글 작성 버튼 노출 */}
                {!course.isPublic && (
                  <Button
                    onClick={() =>
                      router.push(`/posts/create?courseId=${course.id}`)
                    }
                    className='w-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-2 rounded-xl'
                  >
                    <FaPen size={14} />
                    산책로 공유하기
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </>
  );
}

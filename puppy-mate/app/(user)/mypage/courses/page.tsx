'use client';

import { useEffect, useState } from 'react';
import { getMyCourses } from '@/api/course'; // getMyCourses 함수 import
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { GetMyCoursesDto } from '@/application/usecases/course/dto/GetMyCoursesDto'; // DTO 타입 import

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<GetMyCoursesDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getMyCourses();
        setCourses(data);
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
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className='space-y-4 p-4'>
      {courses.length === 0 ? (
        <div className='text-center text-gray-500'>내 코스가 없습니다.</div>
      ) : (
        courses.map((course, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
              <CardDescription>{course.address}</CardDescription>
            </CardHeader>
            <CardContent className='space-y-1'>
              <div>거리: {course.distance} km</div>
              <div>소요 시간: {course.duration} 분</div>
              <div>
                공개 여부:{' '}
                <span
                  className={
                    course.isPublic ? 'text-green-600' : 'text-gray-400'
                  }
                >
                  {course.isPublic ? '공개' : '비공개'}
                </span>
              </div>
              <div className='text-xs text-gray-400'>
                생성일:{' '}
                {course.createdAt
                  ? new Date(course.createdAt).toLocaleDateString()
                  : '-'}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
